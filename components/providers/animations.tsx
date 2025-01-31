'use client';

import {
  FC,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';
import { useDebounceCallback, useMediaQuery } from 'usehooks-ts';

import { mediaQueryMatches } from '@/lib/dom';
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
    planetOrbit: HTMLElement;
    rings: HTMLElement[];
    experience: HTMLElement;
  };

  footer: HTMLElement;
};

const query = {
  sm: '(max-width: 768px)',
  maxLg: '(max-width: 1280px)',
  lg: '(min-width: 1280px)',
};

const AnimationsProvider: FC<{ children: ReactNode }> = memo(
  function AnimationProvider({ children }) {
    const { resolvedTheme } = useScheme();
    const {
      palette: { hex: palette },
      fullfiled: isPaletteFullfiled,
    } = useTheme();

    const elementsRef = useRef<ElementDictionary | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const isMobileDevice = useMediaQuery(query.sm, {
      initializeWithValue: false,
      defaultValue: undefined,
    });

    const masterTimeline = useRef<GSAPTimeline>(
      gsap.timeline({ paused: true }),
    );

    const [isMounted, setIsMounted] = useState(false);

    const [timelineIsMounted, setTimelineIsMounted] = useState(false);

    const { contextSafe, context } = useGSAP(
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
            wrapper: document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER),
            overlay: aboutSelector(`#${ABOUT_ELEMENTS_IDS.OVERLAY}`)[0],
            section: aboutSelector(`#${ABOUT_ELEMENTS_IDS.SECTION}`)[0],
            mobileSection: document.getElementById(
              ABOUT_ELEMENTS_IDS['MOBILE-SECTION'],
            ),
            content: aboutSelector(`#${ABOUT_ELEMENTS_IDS.CONTENT}`)[0],
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
            planetOrbit: developmentSelector('#planet-orbit')[0],
            rings: developmentSelector('.orbit-ring'),
            experience: developmentSelector('#experience')[0],
          },

          footer: document.getElementById('footer'),
        } as ElementDictionary;

        if (
          !validateObject(e.home) ||
          !validateObject(e.about) ||
          !validateObject(e.objective) ||
          !validateObject(e.design) ||
          !validateObject(e.development)
        )
          throw Error('Some element not exists');

        elementsRef.current = e;

        setIsMounted(true);
      },
      { scope: containerRef },
    );

    const clearTimeline = useCallback(() => context.revert(), [context]);

    // #region Build or rebuild pallete/scheme dependant animations safely (without re-initializing timeline)
    const getAboutTransitions = useCallback(
      (timeline?: GSAPTimeline) =>
        contextSafe(() => {
          const aboutBorderByTheme =
            resolvedTheme === 'dark' ? palette[500] : palette[600];

          const { about: a } = elementsRef.current as ElementDictionary;

          const tl =
            timeline ?? masterTimeline.current.getById('about-transition');

          if (!tl) return;

          gsap.set(a.wrapper, {
            height: 0,
            placeSelf: 'center',
            borderColor: aboutBorderByTheme,
            borderTop: 1,
            borderBottom: 1,
            // overwrite: true,
          });

          (tl as GSAPTimeline).add(
            gsap.to(a.wrapper, {
              height: '100%',
              borderColor: `${aboutBorderByTheme}00`,
              overwrite: true,
            }),
            'border-transition',
          );
        })(),
      [contextSafe, palette, resolvedTheme],
    );

    const getObjectiveTransitions = useCallback(
      (timeline?: GSAPTimeline) =>
        contextSafe(() => {
          const { objective: o } = elementsRef.current as ElementDictionary;

          const tl =
            timeline ?? masterTimeline.current.getById('objective-transition');

          if (!tl) return;

          gsap.set(o.words, {
            backgroundColor: 'transparent',
            transitionProperty: 'background-color, color',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
            transitionDuration: '150ms',
            color: 'inherit',
            // Word spacing to make better highlight
            margin: 'auto -0.1em',
            padding: 'auto 0.1em',
          });

          (tl as GSAPTimeline).add(
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

              overwrite: true,
            }),
            'words-transition-=1',
          );
        })(),
      [contextSafe, palette],
    );

    // #endregion

    const setHomeAnimations = useCallback(
      () =>
        contextSafe(() => {
          const { about: a, home } = elementsRef.current as ElementDictionary;

          if (mediaQueryMatches(query.sm)) {
            gsap.set([a.wrapper, a.overlay, a.section, a.content], {
              clearProps: 'all ',
            });

            return;
          }

          if (mediaQueryMatches(query.maxLg)) {
            masterTimeline.current.add(
              gsap
                .timeline({
                  id: 'about-transition-mobile',
                  onStart: () => {
                    gsap.set(a.mobileSection, { willChange: 'opacity' });
                  },
                  scrollTrigger: {
                    trigger: a.mobileSection,
                    end: () => `+=${a.mobileSection.offsetHeight * 0.5}`,
                    start: 'bottom bottom',
                    scrub: true,
                    pin: true,
                  },
                })
                .to(a.mobileSection, {
                  opacity: 0,
                }),
            );
          }

          if (mediaQueryMatches(query.lg)) {
            gsap.set(a.overlay, {
              background: '#000000',
              opacity: 1,
            });

            gsap.set(a.section, {
              scale: 0.75,
            });

            gsap.set(a.content, {
              width: 0,
            });

            const aboutTransition = gsap
              .timeline({
                id: 'about-transition',
                onStart: () => {
                  gsap.set(a.wrapper, { willChange: 'height' });
                  gsap.set(a.overlay, { willChange: 'opacity' });
                  gsap.set(a.section, { willChange: 'transform' });
                  gsap.set(a.content, { willChange: 'width' });
                },
                scrollTrigger: {
                  trigger: home.section,
                  start: 'top top',
                  end: () => `${home.section.offsetHeight * 2}`,
                  scrub: true,
                  pin: true,
                },
              })
              .add('border-transition')
              .to(
                a.overlay,
                {
                  opacity: 0,
                },
                '<',
              )
              .to(
                a.section,
                {
                  scale: 1,
                },
                '<',
              )
              .to(a.content, {
                width: '40%',
              })
              .to(a.section, {
                opacity: 0,
              });

            getAboutTransitions(aboutTransition);

            masterTimeline.current.add(aboutTransition);
          }
        })(),
      [contextSafe, getAboutTransitions],
    );

    const setObjectiveAnimations = useCallback(
      () =>
        contextSafe(() => {
          const { objective: o, design: d } =
            elementsRef.current as ElementDictionary;

          const sm = mediaQueryMatches(query.sm);

          if (!sm) {
            gsap.set(o.clockLines[0], { yPercent: -100, opacity: 0 });
            gsap.set(o.clockLines[1], { yPercent: 100, opacity: 0 });

            // Margin applied to make pin (objectiveSection) section overflow animation possible
            gsap.set(d.wrapper, {
              marginBottom: `-${d.wrapper.clientHeight}px`,
              yPercent: -50,
            });
          }

          gsap.set(o.chars, {
            opacity: 0,
          });

          const getScrollTriggerByDevice = () => {
            if (sm)
              return {
                trigger: o.section,
                start: 'top center',
                end: 'bottom bottom',
                scrub: true,
              };

            return {
              trigger: o.section,
              start: 'center center',
              end: () => `+=${o.section.offsetHeight * 3}`,
              scrub: true,
              pin: true,
            };
          };

          const objectiveTimeline = gsap
            .timeline({
              id: 'objective-transition',
              onStart: () => {
                gsap.set(
                  [o.section, o.text, o.chars, o.clockLines, d.wrapper],
                  {
                    willChange: 'transform, opacity',
                  },
                );
              },
              scrollTrigger: getScrollTriggerByDevice(),
            })
            .to(o.chars, {
              opacity: 1,
              ease: 'circ.inOut',
              stagger: 0.07,
              duration: 3,
              delay: 2,
            })
            .add('words-transition');

          getObjectiveTransitions(objectiveTimeline);

          if (!sm) {
            objectiveTimeline
              .to(
                o.section,
                {
                  opacity: 0.4,
                  duration: 6,
                  scale: 0.95,
                },
                '>+2',
              )
              .to(d.wrapper, { yPercent: -100, duration: 10 }, '>-5');
          }

          masterTimeline.current.add(objectiveTimeline);
        })(),
      [contextSafe, getObjectiveTransitions],
    );

    const setDevelopmentAnimations = useCallback(
      () =>
        contextSafe(() => {
          const { development, footer } =
            elementsRef.current as ElementDictionary;
          const { content, hero, ringsContainer, globe, experience } =
            development;

          const developmentSectionMargin = hero.clientHeight * 0.7;

          const bg = '#111111';

          gsap.set(content, {
            marginTop: `-${developmentSectionMargin}px`,
            backgroundColor: `${bg}40`,
          });

          const developmentTimeline = gsap
            .timeline({
              id: 'development',
              onStart: () => {
                gsap.set(ringsContainer, {
                  willChange: 'transform, opacity',
                });
                gsap.set(globe, { willChange: 'transform' });
              },
              scrollTrigger: {
                trigger: content,
                start: 'start center',
                end: () => `+=${content.offsetHeight * 0.2}`,
                scrub: true,
              },
            })
            .to(content, {
              backgroundColor: `${bg}95`,
            })
            .to(globe, { scale: 1.5, ease: 'power1.inOut' }, '<')
            .to(ringsContainer, { opacity: 0.2, ease: 'power1.inOut' }, '<');

          if (mediaQueryMatches(query.lg))
            developmentTimeline.to(
              ringsContainer,
              { scale: 2, opacity: 0.2, ease: 'power1.inOut' },
              '<',
            );

          masterTimeline.current.add(developmentTimeline);

          const sm = mediaQueryMatches(query.sm);

          const endTimeline = gsap
            .timeline({
              id: 'end',
              scrollTrigger: {
                trigger: experience,
                start: sm ? 'top bottom' : 'top bottom-=300',
                endTrigger: footer,
                end: 'bottom bottom',
                scrub: true,
              },
            })
            .to(globe, {
              yPercent: sm ? 250 : 150,
              scale: 2.5,
              duration: 10,
            })
            .to(content, { opacity: 0, duration: 0.5 }, '>');

          masterTimeline.current.add(endTimeline);
        })(),
      [contextSafe],
    );

    const loadAnimations = useCallback(
      (force?: boolean) => {
        if (!isPaletteFullfiled || !isMounted || (!force && timelineIsMounted))
          return;

        if (!timelineIsMounted) setTimelineIsMounted(true);

        setHomeAnimations();

        setObjectiveAnimations();

        setDevelopmentAnimations();
      },
      [
        isMounted,
        isPaletteFullfiled,
        setDevelopmentAnimations,
        setHomeAnimations,
        setObjectiveAnimations,
        timelineIsMounted,
      ],
    );

    // Initial animations load
    useEffect(() => {
      loadAnimations();
    }, [loadAnimations]);

    // Reload on resize
    const debouncedLoad = useDebounceCallback(() => {
      clearTimeline();
      loadAnimations(true);
    }, 100);

    // Rebuild animations only on width change, to prevent lag on phones
    useEffect(() => {
      if (typeof window === 'undefined') return;

      let prevWidth = window.innerWidth;

      const onResize = () => {
        const width = window.innerWidth;

        if (width !== prevWidth) {
          prevWidth = width;
          debouncedLoad();
        }
      };

      window.addEventListener('resize', onResize);

      return () => {
        window.removeEventListener('resize', onResize);
      };
    }, [debouncedLoad]);

    // Update only pallete-dependent tweens on scheme or pallete change
    useEffect(() => {
      getAboutTransitions();
      getObjectiveTransitions();
    }, [getAboutTransitions, getObjectiveTransitions]);

    // Development section elements pointer interaction
    useGSAP(
      (_, contextSafe) => {
        if (!contextSafe || !isMounted || isMobileDevice === undefined) return;

        const { development } = elementsRef.current as ElementDictionary;

        const { rings, globe, ringsContainer, section } = development;

        // Opacity and padding settings
        rings.forEach((ring, index) => {
          const opacity = Math.max(0, 80 + index * 2);
          const paddingValue = Math.max(0, 10 - index * 0.25);

          gsap.set(ring, {
            padding: `${paddingValue}%`,
            opacity: `${opacity}%`,
          });
        });

        // Globe Resize Handler
        const resizeGlobe = contextSafe(() => {
          // Ring visual position
          const ring = rings.at(-5) as HTMLElement;

          gsap.set(globe, {
            width: `${ring.offsetWidth}px`,
            height: `${ring.offsetHeight}px`,
          });

          gsap.set(globe.getElementsByTagName('canvas'), {
            width: `${ring.offsetWidth}px`,
            height: `${ring.offsetHeight}px`,
          });
        });

        resizeGlobe();
        window.addEventListener('resize', resizeGlobe);

        // Parallax Effect Handlers
        const handleMouseParallax = contextSafe((event: MouseEvent) => {
          gsap.set(rings, { willChange: 'transform' });
          gsap.set(globe, { willChange: 'transform' });

          const baseDeltaX = event.clientX - window.innerWidth / 2;
          const baseDeltaY = event.clientY - window.innerHeight / 2;

          const getDeltaValues = (multiplicator: number) => ({
            x: baseDeltaX * multiplicator,
            y: baseDeltaY * multiplicator,
          });

          gsap.to(rings, { ...getDeltaValues(0.009), duration: 0.75 });
          gsap.to(globe, { ...getDeltaValues(0.05), duration: 0.75 });
        });

        const restoreElementsPosition = contextSafe(() => {
          gsap.to(rings, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'back.out',
            willChange: 'none',
          });
          gsap.to(globe, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'back.out',
            willChange: 'none',
          });
        });

        const ringsRotation = gsap.to(ringsContainer, {
          rotation: 360,
          duration: 60,
          transformOrigin: 'center center',
          repeat: -1,
          ease: 'linear',
        });

        // Disable animations when development section is not in viewport
        const observer = new IntersectionObserver(([entry]) => {
          if (!entry.isIntersecting) {
            ringsRotation.pause();
            document.removeEventListener('mousemove', handleMouseParallax);
            document.removeEventListener('mouseleave', restoreElementsPosition);

            return;
          }

          if (!isMobileDevice) {
            document.addEventListener('mousemove', handleMouseParallax);
            document.addEventListener('mouseleave', restoreElementsPosition);
          }

          ringsRotation.play();
        });

        observer.observe(section);

        // Cleanup Function
        return () => {
          window.removeEventListener('resize', resizeGlobe);

          observer.unobserve(section);

          if (!isMobileDevice) {
            document.removeEventListener('mousemove', handleMouseParallax);
            document.removeEventListener('mouseleave', restoreElementsPosition);
          }
        };
      },
      { dependencies: [isMounted, isMobileDevice], scope: containerRef },
    );

    return (
      <div ref={containerRef} className='content'>
        {children}
      </div>
    );
  },
);

export default AnimationsProvider;
