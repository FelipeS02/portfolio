'use client';

import { ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';

import { getReadableForeground } from '@/lib/theme';
import { validateObject } from '@/lib/utils';
import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { CLOCK_LINES_TILE } from '../sections/objective/clock_lines';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
import { PROJECT_FIGURE_CLASS } from '../sections/objective/project-card';
import { PROJECTS } from '../sections/objective/projects';
import { DESIGN_ELEMENTS_IDS } from '../sections/services/design/design';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/services/development/development';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);
}

type ElementDictionary = {
  home: {
    section: HTMLElement;
  };

  about: {
    wrapper: HTMLElement;
    overlay: HTMLElement;
    section: HTMLElement;
    mobileSection: HTMLElement;
    content: HTMLElement;
    contentInner: HTMLElement;
  };

  objective: {
    section: HTMLElement;
    // Offset parent shared by text and textSlot — the corner math depends on it
    stage: HTMLElement;
    text: HTMLElement;
    textSlot: HTMLElement;
    track: HTMLElement;
    figures: HTMLElement[];
    chars: HTMLElement[];
    words: HTMLElement[];
    clockLines: HTMLElement[];
    clockTracks: HTMLElement[];
  };

  design: {
    wrapper: HTMLElement;
  };

  development: {
    section: HTMLElement;
    content: HTMLElement;
    hero: HTMLElement;
    globe: HTMLElement;
    ringsContainer: HTMLElement;
    experience: HTMLElement;
  };

  footer: HTMLElement;
};

// How many tiles the clock ticks travel across the whole objective scroll
const CLOCK_LINES_LAPS = 8;

// Timeline units one project panel takes. Only sets proportions inside the
// timeline — raise it and everything else in the objective happens faster
// relative to the panels, not slower overall
const PANEL_DURATION = 4;

// Viewports of scrolling each panel costs. This is the "weight" knob: raise it
// and a card takes more wheel to cross the screen
const PANEL_SCROLL_VIEWPORTS = 1.2;

// Figure drag. A scroll jolt offsets the whole figure against the direction of
// travel and it eases back to rest, so the panels read as heavy instead of
// rigid. Moving the box rather than the media inside it means nothing has to be
// cropped or scaled to hide the slide — the travel is free to grow
const FIGURE_DRAG_MAX = 6;
// px/s of scroll per percent of drag — lower hits the cap on a gentler flick
const FIGURE_DRAG_DAMPING = 150;
const FIGURE_DRAG_RECOVERY = 0.9;

const breakpoints = {
  isSm: '(max-width: 768px)',
  isMaxLg: '(max-width: 1280px)',
  isLg: '(min-width: 1280px)',
};

type Breakpoints = Record<keyof typeof breakpoints, boolean>;

function AnimationsProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useScheme();
  const {
    palette: { hex: palette },
    hexCode,
    fullfiled: isPaletteFullfiled,
  } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const objectiveText = document.getElementById(
        OBJECTIVE_ELEMENTS_IDS.TEXT,
      ) as HTMLElement;

      const objectiveSelectorText = gsap.utils.selector(objectiveText);

      const aboutWrapper = document.getElementById(
        ABOUT_ELEMENTS_IDS.WRAPPER,
      ) as HTMLElement;

      const aboutSelector = gsap.utils.selector(aboutWrapper);

      const developmentSection = document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.SECTION,
      );

      const developmentSelector = gsap.utils.selector(developmentSection);

      const e = {
        home: {
          section: document.getElementById(HOME_ELEMENT_IDS.SECTION),
        },

        about: {
          wrapper: aboutWrapper,
          overlay: aboutSelector(`#${ABOUT_ELEMENTS_IDS.OVERLAY}`)[0],
          section: aboutSelector(`#${ABOUT_ELEMENTS_IDS.SECTION}`)[0],
          mobileSection: document.getElementById(
            ABOUT_ELEMENTS_IDS['MOBILE-SECTION'],
          ),
          content: aboutSelector(`#${ABOUT_ELEMENTS_IDS.CONTENT}`)[0],
          contentInner: aboutSelector(
            `#${ABOUT_ELEMENTS_IDS.CONTENT_INNER}`,
          )[0],
        },

        objective: {
          section: document.getElementById(OBJECTIVE_ELEMENTS_IDS.SECTION),
          stage: document.getElementById(OBJECTIVE_ELEMENTS_IDS.STAGE),
          text: objectiveText,
          textSlot: document.getElementById(OBJECTIVE_ELEMENTS_IDS.TEXT_SLOT),
          track: document.getElementById(OBJECTIVE_ELEMENTS_IDS.TRACK),
          figures: Array.from(
            document.getElementsByClassName(PROJECT_FIGURE_CLASS),
          ),
          chars: objectiveSelectorText('.char'),
          words: objectiveSelectorText('.word').filter((element) => {
            const word = element.getAttribute('data-word');
            return (
              word === 'productos' ||
              word === 'atemporales' ||
              word === 'products' ||
              word === 'timeless'
            );
          }),
          clockLines: Array.from(
            document.getElementsByClassName('clock-lines'),
          ),
          clockTracks: Array.from(
            document.getElementsByClassName('clock-lines-track'),
          ),
        },

        design: {
          wrapper: document.getElementById(DESIGN_ELEMENTS_IDS.WRAPPER),
        },

        development: {
          section: developmentSection,
          content: developmentSelector(
            `#${DEVELOPMENT_ELEMENTS_IDS.CONTENT}`,
          )[0],
          hero: developmentSelector(`#${DEVELOPMENT_ELEMENTS_IDS.HERO}`)[0],
          globe: developmentSelector('#globe')[0],
          ringsContainer: developmentSelector('#rings-container')[0],
          experience: developmentSelector('#experience')[0],
        },

        footer: document.getElementById('footer'),
      } as ElementDictionary;

      if (
        process.env.NODE_ENV === 'development' &&
        (!validateObject(e.home) ||
          !validateObject(e.about) ||
          !validateObject(e.objective) ||
          !validateObject(e.design) ||
          !validateObject(e.development))
      )
        throw Error('Some element not exists');

      // Colors come from the theme API, so there is nothing to paint until it lands
      if (!isPaletteFullfiled) return;

      const mm = gsap.matchMedia();

      // matchMedia reverts everything a handler created once its query stops
      // matching, so each breakpoint only has to describe its own setup
      mm.add(breakpoints, (context) => {
        const { isSm, isMaxLg, isLg } = context.conditions as Breakpoints;

        const { home, about: a, objective: o, design: d, development } = e;

        // #region About
        if (!isSm && isMaxLg)
          gsap
            .timeline({
              scrollTrigger: {
                trigger: a.mobileSection,
                end: () => `+=${a.mobileSection.offsetHeight * 0.5}`,
                start: 'bottom bottom',
                scrub: true,
                pin: true,
              },
            })
            .to(a.mobileSection, { opacity: 0 });

        if (isLg) {
          const borderColor =
            resolvedTheme === 'dark' ? palette[500] : palette[600];

          gsap.set(a.overlay, { background: '#000000', opacity: 1 });
          gsap.set(a.section, { scale: 0.75 });
          gsap.set(a.content, { width: 0 });
          gsap.set(a.wrapper, {
            height: 0,
            placeSelf: 'center',
            borderColor,
            borderTop: 1,
            borderBottom: 1,
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: home.section,
                start: 'top top',
                end: () => `${home.section.offsetHeight * 2}`,
                scrub: true,
                pin: true,
              },
            })
            .to(a.wrapper, {
              height: '100%',
              borderColor: `${borderColor}00`,
            })
            .to(a.overlay, { opacity: 0 }, '<')
            .to(a.section, { scale: 1 }, '<')
            .to(a.content, {
              width: Math.max(
                a.wrapper.clientWidth * 0.4,
                a.contentInner.clientWidth,
              ),
            })
            .to(a.section, { opacity: 0 });
        }
        // #endregion

        // #region Objective
        if (!isSm) {
          gsap.set(o.clockLines[0], { yPercent: -100, opacity: 0 });
          gsap.set(o.clockLines[1], { yPercent: 100, opacity: 0 });

          // Margin applied to make pin (objectiveSection) section overflow animation possible
          gsap.set(d.wrapper, {
            marginBottom: `-${d.wrapper.clientHeight}px`,
            yPercent: -50,
          });
        }

        gsap.set(o.chars, { opacity: 0 });

        gsap.set(o.words, {
          backgroundColor: 'transparent',
          color: 'inherit',
          // Word spacing to make better highlight
          margin: '0 -0.1em',
          padding: '0 0.1em',
        });

        // Heading shrinks into the corner slot from its own top-left, so the
        // translation and the scale share an origin
        gsap.set(o.text, { transformOrigin: '0 0' });

        const figureDrag = { percent: 0 };
        const setFigureDrag = gsap.quickSetter(o.figures, 'xPercent');
        const applyFigureDrag = () => setFigureDrag(figureDrag.percent);

        // Reads scroll velocity rather than timeline progress: the pan is
        // linear, so progress alone carries no sense of how hard the panels are
        // being pushed. Scrolling forward yields a positive velocity, hence the
        // negated ratio — the figure lags left while the track travels left
        const dragFigures = (self: ScrollTrigger) => {
          // Once the panels have handed off to the services section, the
          // figures are gone from view — a jolt here would just animate
          // nothing and leave stale drag state behind
          if (
            objectiveTimeline.time() >= objectiveTimeline.labels['projects-end']
          )
            return;

          const percent = gsap.utils.clamp(
            -FIGURE_DRAG_MAX,
            FIGURE_DRAG_MAX,
            self.getVelocity() / -FIGURE_DRAG_DAMPING,
          );

          // A fresh jolt only takes over while it beats the one still easing
          // out, so a sustained scroll reads as one lag instead of a stutter
          if (Math.abs(percent) <= Math.abs(figureDrag.percent)) return;

          figureDrag.percent = percent;

          gsap.to(figureDrag, {
            percent: 0,
            duration: FIGURE_DRAG_RECOVERY,
            ease: 'power3',
            overwrite: true,
            onUpdate: applyFigureDrag,
          });
        };

        const objectiveTimeline = gsap
          .timeline({
            scrollTrigger: isSm
              ? {
                  trigger: o.text,
                  start: 'top center',
                  end: () => `+=${window.innerHeight * 0.5}`,
                  scrub: true,
                }
              : {
                  trigger: o.section,
                  start: 'center center',
                  end: () =>
                    `+=${
                      o.section.offsetHeight * 3 +
                      PROJECTS.length *
                        window.innerHeight *
                        PANEL_SCROLL_VIEWPORTS
                    }`,
                  scrub: true,
                  pin: true,
                  invalidateOnRefresh: true,
                  onUpdate: dragFigures,
                },
          })
          .to(o.chars, {
            opacity: 1,
            ease: 'circ.inOut',
            stagger: 0.07,
            duration: 3,
            delay: 2,
          })
          .add('words-transition')
          .to(
            o.words,
            {
              backgroundColor: palette[700],
              color: palette[50],
              ease: 'none',
              duration: 1,
            },
            'words-transition-=1',
          );

        if (!isSm) {
          objectiveTimeline.to(
            o.clockLines,
            { opacity: 1, yPercent: 0, ease: 'expo.out', duration: 1 },
            'words-transition-=1',
          );

          objectiveTimeline
            .add('projects', '>+1')
            // Heading flies to the top-left corner. offsetLeft/offsetTop ignore
            // transforms, so these stay correct when invalidateOnRefresh re-runs
            // them. fromTo keeps both ends explicit, so an invalidate mid-scroll
            // can never record an already-transformed state as the start
            .fromTo(
              o.text,
              { x: 0, y: 0, scale: 1 },
              {
                x: () => o.textSlot.offsetLeft - o.text.offsetLeft,
                y: () => o.textSlot.offsetTop - o.text.offsetTop,
                scale: () => o.textSlot.offsetWidth / o.text.offsetWidth,
                ease: 'power1.inOut',
                duration: PANEL_DURATION,
              },
              'projects',
            );

          // Every panel is positioned off the `projects` label rather than off
          // the previous tween, so the pans chain with no dead frames between
          // them. The pan itself stays linear: any ease flattens out near the
          // end and reads as the scroll locking up right as the card centres
          PROJECTS.forEach((project, panel) => {
            const at = panel * PANEL_DURATION;

            if (panel === 0)
              // First panel rides in from off-screen right
              objectiveTimeline.fromTo(
                o.track,
                { x: () => window.innerWidth },
                { x: 0, ease: 'none', duration: PANEL_DURATION },
                `projects+=${at}`,
              );
            else
              objectiveTimeline.to(
                o.track,
                {
                  x: () => -panel * window.innerWidth,
                  ease: 'none',
                  duration: PANEL_DURATION,
                },
                `projects+=${at}`,
              );

            // Accent runs over the back half of the pan, so it has landed by
            // the time the card sits in the centre
            objectiveTimeline.to(
              o.words,
              {
                backgroundColor: project.color,
                color: getReadableForeground(project.color),
                ease: 'none',
                duration: PANEL_DURATION * 0.5,
              },
              `projects+=${at + PANEL_DURATION * 0.4}`,
            );
          });

          objectiveTimeline.add(
            'projects-end',
            `projects+=${PROJECTS.length * PANEL_DURATION}`,
          );

          // Anchored to the label, not to `>`: the last accent tween finishes
          // before the last pan does, so `>` would start the hand-off early
          objectiveTimeline
            .to(
              o.section,
              { opacity: 0.4, duration: 6, scale: 0.95 },
              'projects-end+=2',
            )
            .to(d.wrapper, { yPercent: -100, duration: 10 }, '>-5');

          // Ticks slide sideways for the whole ride, wrapped inside one tile so
          // the strip never runs out of ruler. Added last, at position 0, with
          // the duration the timeline ended up with.
          // Mobile isn't pinned and its scroll ride is too short for this scrub
          // to read well, so it keeps a plain CSS crawl instead (see
          // clock_lines.tsx's `max-md:animate-clock-ticks-*` classes)
          o.clockTracks.forEach((track, index) => {
            gsap.set(track, { x: 0 });

            objectiveTimeline.to(
              track,
              {
                x:
                  (index === 0 ? -1 : 1) * CLOCK_LINES_TILE * CLOCK_LINES_LAPS,
                ease: 'none',
                duration: objectiveTimeline.duration(),
                modifiers: {
                  x: gsap.utils.unitize(gsap.utils.wrap(0, CLOCK_LINES_TILE)),
                },
              },
              0,
            );
          });
        }

        // No per-project tint on mobile: the panels stack below the heading, so
        // by the time one reaches the centre the highlighted words are long gone
        // #endregion

        // #region Development
        const { content, hero, ringsContainer, globe, experience } =
          development;

        const bg = '#111111';

        gsap.set(content, {
          marginTop: `-${hero.clientHeight * 0.7}px`,
          backgroundColor: `${bg}40`,
        });

        const developmentTimeline = gsap
          .timeline({
            scrollTrigger: {
              trigger: content,
              start: 'top center',
              end: () => `+=${content.offsetHeight * 0.2}`,
              scrub: true,
            },
          })
          .to(globe, { scale: 1.5, ease: 'power1.inOut' })
          .to(ringsContainer, { opacity: 0.2, ease: 'power1.inOut' }, '<')
          .to(content, { backgroundColor: `${bg}95` }, '<');

        if (isLg)
          developmentTimeline.to(
            ringsContainer,
            { scale: 2, translateZ: 0, opacity: 0.2, ease: 'power1.inOut' },
            '<',
          );

        gsap
          .timeline({
            scrollTrigger: {
              trigger: experience,
              start: isSm ? 'top bottom' : 'top bottom+=500',
              endTrigger: e.footer,
              end: 'bottom bottom',
              scrub: true,
            },
          })
          .to(globe, {
            yPercent: isSm ? 250 : 150,
            scale: 2.5,
            duration: 10,
          })
          .to(content, { opacity: 0, duration: 1, ease: 'power4.inOut' }, '>');
        // #endregion
      });

      return () => mm.revert();
    },
    {
      scope: containerRef,
      // resolvedTheme excluded on purpose: it only tints the about-wrapper
      // border, not worth reverting the whole ScrollTrigger/pin scaffold for.
      // A rebuild triggered by a dark/light toggle killed the pin on
      // home.section mid-way through the theme-switch scale tween.
      // ponytail: about-border color goes stale until next real rebuild
      // (palette change or resize); live-update it via a scoped
      // contextSafe setter if that desync becomes noticeable.
      dependencies: [isPaletteFullfiled, hexCode],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={containerRef} className='content'>
      {children}
    </div>
  );
}

export default AnimationsProvider;
