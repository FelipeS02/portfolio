'use client';

import { ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';

import { validateObject } from '@/lib/utils';
import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
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
    text: HTMLElement;
    chars: HTMLElement[];
    words: HTMLElement[];
    clockLines: HTMLElement[];
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
          text: objectiveText,
          chars: objectiveSelectorText('.char'),
          words: objectiveSelectorText('.word').filter((element) => {
            const word = element.getAttribute('data-word');
            return word === 'productos' || word === 'atemporales';
          }),
          clockLines: Array.from(
            document.getElementsByClassName('clock-lines'),
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
          transitionProperty: 'background-color, color',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
          transitionDuration: '150ms',
          color: 'inherit',
          // Word spacing to make better highlight
          margin: '0 -0.1em',
          padding: '0 0.1em',
        });

        const objectiveTimeline = gsap
          .timeline({
            scrollTrigger: isSm
              ? {
                  trigger: o.section,
                  start: 'top center',
                  end: 'bottom bottom',
                  scrub: true,
                }
              : {
                  trigger: o.section,
                  start: 'center center',
                  end: () => `+=${o.section.offsetHeight * 3}`,
                  scrub: true,
                  pin: true,
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
          .add(
            gsap.timeline({
              onReverseComplete: () => {
                const transitionProps = {
                  opacity: 0,
                  duration: 0.35,
                  ease: 'back.out',
                };

                gsap.to(o.clockLines[0], {
                  yPercent: -100,
                  ...transitionProps,
                });
                gsap.to(o.clockLines[1], {
                  yPercent: 100,
                  ...transitionProps,
                });

                gsap.set(o.words, {
                  color: 'inherit',
                  backgroundColor: 'transparent',
                });
              },
              onComplete: () => {
                gsap.to(o.clockLines, {
                  opacity: 1,
                  yPercent: 0,
                  ease: 'expo.out',
                  duration: 0.35,
                });

                gsap.set(o.words, {
                  color: palette[50],
                  backgroundColor: palette[700],
                });
              },
            }),
            'words-transition-=1',
          );

        if (!isSm)
          objectiveTimeline
            .to(
              o.section,
              { opacity: 0.4, duration: 6, scale: 0.95 },
              '>+2',
            )
            .to(d.wrapper, { yPercent: -100, duration: 10 }, '>-5');
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
