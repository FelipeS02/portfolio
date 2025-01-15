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
import { useMediaQuery } from 'usehooks-ts';

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
  };
};

const mediaQueryOptions = {
  initializeWithValue: false,
  defaultValue: undefined,
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

    const isMaxLgDevice = useMediaQuery(
      '(max-width: 1280px)',
      mediaQueryOptions,
    );
    const isXlDevice = useMediaQuery('(min-width: 1280px)', mediaQueryOptions);
    const isMobileDevice = useMediaQuery(
      '(any-pointer: coarse)',
      mediaQueryOptions,
    );

    const masterTimeline = useRef<GSAPTimeline>(
      gsap.timeline({ paused: true }),
    );

    const clearTimeline = useCallback(() => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    }, []);

    const [isMounted, setIsMounted] = useState(false);

    const { contextSafe } = useGSAP(
      () => {
        const startTime = performance.now();

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
          },
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

        const endTime = performance.now();
        console.log(`Tiempo elementos ${endTime - startTime}`);
      },
      { scope: containerRef },
    );

    const setHomeAnimations = useCallback(
      () =>
        contextSafe(() => {
          const borderByTheme =
            resolvedTheme === 'dark' ? palette[700] : palette[400];

          const { about: a, home } = elementsRef.current as ElementDictionary;

          if (isMaxLgDevice) {
            masterTimeline.current.add(
              gsap
                .timeline({
                  id: 'about-mobile',
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

          if (isXlDevice) {
            gsap.set(a.wrapper, {
              height: 0,
              placeSelf: 'center',
              borderColor: borderByTheme,
              borderTop: 1,
              borderBottom: 1,
            });

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

            masterTimeline.current.add(
              gsap
                .timeline({
                  id: 'home',
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
                .to(a.wrapper, {
                  height: '100%',
                  borderColor: `${borderByTheme}00`,
                })
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
                }),
            );
          }
        })(),
      [isMaxLgDevice, isXlDevice, palette, resolvedTheme, contextSafe],
    );

    const setObjectiveAnimations = useCallback(
      () =>
        contextSafe(() => {
          const { objective: o, design: d } =
            elementsRef.current as ElementDictionary;

          gsap.set(o.clockLines[0], { yPercent: -100, opacity: 0 });
          gsap.set(o.clockLines[1], { yPercent: 100, opacity: 0 });
          gsap.set(o.chars, {
            opacity: 0,
          });
          gsap.set(o.words, {
            backgroundColor: 'transparent',
            transitionProperty: 'background-color, filter',
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
            transitionDuration: '150ms',
          });

          // Margin applied to make pin (objectiveSection) section overflow animation possible
          gsap.set(d.wrapper, {
            marginBottom: `-${d.wrapper.clientHeight}px`,
            yPercent: -50,
          });

          masterTimeline.current.add(
            gsap
              .timeline({
                id: 'objective',
                onStart: () => {
                  gsap.set(
                    [o.section, o.text, o.chars, o.clockLines, d.wrapper],
                    {
                      willChange: 'transform, opacity',
                    },
                  );
                },
                scrollTrigger: {
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
              .to(
                o.clockLines,
                {
                  opacity: 1,
                  yPercent: 0,
                  ease: 'linear',
                  duration: 1,
                },
                '>-2',
              )
              .to(
                o.words,
                {
                  backgroundColor:
                    resolvedTheme === 'dark'
                      ? 'hsl(var(--palette-800))'
                      : 'hsl(var(--palette-200))',
                },
                '>-1',
              )
              .to(
                o.section,
                {
                  opacity: 0.4,
                  duration: 6,
                  scale: 0.95,
                },
                '>+2',
              )
              .to(d.wrapper, { yPercent: -100, duration: 10 }, '>-5'),
          );
        })(),
      [resolvedTheme, contextSafe],
    );

    const setDevelopmentAnimations = useCallback(
      () =>
        contextSafe(() => {
          const { development } = elementsRef.current as ElementDictionary;
          const { content, hero, ringsContainer, globe } = development;

          const developmentSectionMargin =
            window.innerHeight - hero.offsetHeight;

          const bg = '#111111';

          gsap.set(content, {
            marginTop: `${developmentSectionMargin}px`,
            backgroundColor: `${bg}40`,
          });

          masterTimeline.current.add(
            gsap
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
              .to(
                ringsContainer,
                { scale: 2, opacity: 0.2, ease: 'power1.inOut' },
                '<',
              )
              .to(globe, { scale: 1.5, ease: 'power1.inOut' }, '<'),
          );
        })(),
      [contextSafe],
    );

    useEffect(() => {
      const startTime = performance.now();
      if (
        !isPaletteFullfiled ||
        !resolvedTheme ||
        !isMounted ||
        isMaxLgDevice === undefined ||
        isXlDevice === undefined
      )
        return;

      clearTimeline();

      setHomeAnimations();

      setObjectiveAnimations();

      setDevelopmentAnimations();

      const endTime = performance.now();
      console.log(`Tiempo animaciones ${endTime - startTime}`);

      return () => {
        clearTimeline();
      };
    }, [
      clearTimeline,
      setDevelopmentAnimations,
      setHomeAnimations,
      setObjectiveAnimations,
      isMounted,
      isPaletteFullfiled,
      isMaxLgDevice,
      isXlDevice,
      resolvedTheme,
    ]);

    // Development section elements pointer interaction
    useGSAP(
      (_, contextSafe) => {
        if (!contextSafe || !isMounted || isMobileDevice === undefined) return;

        const { development } = elementsRef.current as ElementDictionary;

        const { rings, globe, ringsContainer, section } = development;

        // Mobile Rings Setup
        if (isMobileDevice) {
          rings.forEach((ring, index) => {
            const rotate = '20deg';

            if (index === rings.length - 1) {
              gsap.set(ring, {
                rotate,
              });
              return;
            }

            const opacity = Math.max(0, 90 + index * 2);
            const paddingValue = Math.max(0, 10 - index * 0.25);

            gsap.set(ring, {
              clear: 'filter',
              padding: `${paddingValue}%`,
              opacity: `${opacity}%`,
              rotate,
            });
          });
        } else {
          // Desktop Rings Setup
          rings.forEach((ring, index) => {
            const rotate = '20deg';
            if (index === rings.length - 1) {
              gsap.set(ring, {
                rotate,
              });
              return;
            }

            const paddingValue = Math.max(0, 10 - index * 0.25);
            const blur = Math.max(0, 0.05 + index * 0.15);

            gsap.set(ring, {
              clear: 'opacity',
              padding: `${paddingValue}%`,
              filter: `blur(${blur}px)`,
              rotate,
            });
          });
        }

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

          const ringsDeltaX = (event.clientX - window.innerWidth / 2) * 0.01;
          const ringsDeltaY = (event.clientY - window.innerHeight / 2) * 0.01;

          const globeDeltaX = (event.clientX - window.innerWidth / 2) * 0.05;
          const globeDeltaY = (event.clientY - window.innerHeight / 2) * 0.05;

          gsap.to(rings, { x: ringsDeltaX, y: ringsDeltaY, duration: 0.75 });
          gsap.to(globe, { x: globeDeltaX, y: globeDeltaY, duration: 0.75 });
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

          if (isMobileDevice) {
            document.addEventListener('mousemove', handleMouseParallax);
            document.addEventListener('mouseleave', restoreElementsPosition);
          }

          ringsRotation.play();
        });

        observer.observe(section);

        // Cleanup Function
        return () => {
          window.removeEventListener('resize', resizeGlobe);
          document.removeEventListener('mousemove', handleMouseParallax);
          document.removeEventListener('mouseleave', restoreElementsPosition);
          observer.unobserve(section);
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
