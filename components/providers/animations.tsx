'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';
import { useMediaQuery } from 'usehooks-ts';

import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
import { DESIGN_ELEMENTS_IDS } from '../sections/services/design/design';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/services/development/development';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, ScrollTrigger, Draggable);
}

type ElementDictionaryKey =
  | 'homeSection'
  | 'aboutWrapper'
  | 'aboutOverlay'
  | 'aboutSection'
  | 'aboutContent'
  | 'objectiveSection'
  | 'objectiveText'
  | 'developmentContent'
  | 'aboutMobileSection'
  | 'developmentHero'
  | 'globe'
  | 'ringsContainer'
  | 'planetOrbit'
  | 'developmentSection'
  | 'designSection'
  | 'designWrapper';

const mediaQueryOptions = {
  initializeWithValue: false,
  defaultValue: undefined,
};

const AnimationsProvider = memo(function AnimationProvider() {
  const { resolvedTheme } = useScheme();
  const {
    palette: { hex: palette },
    fullfiled: isPaletteFullfiled,
  } = useTheme();

  const elementsRef = useRef<Record<ElementDictionaryKey, HTMLElement> | null>(
    null,
  );

  const isMaxLgDevice = useMediaQuery('(max-width: 1280px)', mediaQueryOptions);
  const isXlDevice = useMediaQuery('(min-width: 1280px)', mediaQueryOptions);
  const isMobileDevice = useMediaQuery(
    '(any-pointer: coarse)',
    mediaQueryOptions,
  );

  const masterTimeline = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  const clearTimeline = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const elements = {
      // Home elements
      homeSection: document.getElementById(HOME_ELEMENT_IDS.SECTION),
      aboutWrapper: document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER),
      aboutOverlay: document.getElementById(ABOUT_ELEMENTS_IDS.OVERLAY),
      aboutSection: document.getElementById(ABOUT_ELEMENTS_IDS.SECTION),
      aboutMobileSection: document.getElementById(
        ABOUT_ELEMENTS_IDS['MOBILE-SECTION'],
      ),
      aboutContent: document.getElementById(ABOUT_ELEMENTS_IDS.CONTENT),

      // Objective elements
      objectiveSection: document.getElementById(OBJECTIVE_ELEMENTS_IDS.SECTION),
      objectiveText: document.getElementById(OBJECTIVE_ELEMENTS_IDS.TEXT),

      // Design element
      designWrapper: document.getElementById(DESIGN_ELEMENTS_IDS.WRAPPER),

      // Development elements
      developmentContent: document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.CONTENT,
      ),
      developmentHero: document.getElementById(DEVELOPMENT_ELEMENTS_IDS.HERO),
      developmentSection: document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.SECTION,
      ),
      globe: document.getElementById('3d-globe'),
      ringsContainer: document.getElementById('rings-container'),
      planetOrbit: document.getElementById('planet-orbit'),
    } as Record<ElementDictionaryKey, HTMLElement>;

    if (!Object.values(elements).every(Boolean)) return;

    elementsRef.current = elements;

    setIsMounted(true);
  }, []);

  useGSAP(() => {
    if (
      !isPaletteFullfiled ||
      !resolvedTheme ||
      !isMounted ||
      isMaxLgDevice === undefined ||
      isXlDevice === undefined
    )
      return;

    const borderByTheme =
      resolvedTheme === 'dark' ? palette[700] : palette[400];
    const bgByTheme = '#111111';

    const {
      homeSection,
      aboutWrapper,
      aboutOverlay,
      aboutSection,
      aboutContent,
      aboutMobileSection,
      objectiveSection,
      objectiveText,
      developmentContent,
      developmentHero,
      globe,
      ringsContainer,
      designWrapper,
    } = elementsRef.current as Record<ElementDictionaryKey, HTMLElement>;

    const sectionMargin = window.innerHeight - developmentHero.offsetHeight;

    clearTimeline();

    // #region Home section animations

    if (isMaxLgDevice) {
      masterTimeline.current.add(
        gsap
          .timeline({
            id: 'about-mobile',
            onStart: () => {
              gsap.set(aboutMobileSection, { willChange: 'opacity' });
            },
            scrollTrigger: {
              trigger: aboutMobileSection,
              end: () => `+=${aboutMobileSection.offsetHeight * 0.5}`,
              start: 'bottom bottom',
              scrub: true,
              pin: true,
            },
          })
          .to(aboutMobileSection, {
            opacity: 0,
          }),
      );
    }

    if (isXlDevice) {
      gsap.set(aboutWrapper, {
        height: 0,
        placeSelf: 'center',
        borderColor: borderByTheme,
        borderTop: 1,
        borderBottom: 1,
      });

      gsap.set(aboutOverlay, {
        background: '#000000',
        opacity: 1,
      });

      gsap.set(aboutSection, {
        scale: 0.75,
      });

      gsap.set(aboutContent, {
        width: 0,
      });

      masterTimeline.current.add(
        gsap
          .timeline({
            id: 'home',
            onStart: () => {
              gsap.set(aboutWrapper, { willChange: 'height' });
              gsap.set(aboutOverlay, { willChange: 'opacity' });
              gsap.set(aboutSection, { willChange: 'transform' });
              gsap.set(aboutContent, { willChange: 'width' });
            },
            scrollTrigger: {
              trigger: homeSection,
              start: 'top top',
              end: () => `${homeSection.offsetHeight * 2}`,
              scrub: true,
              pin: true,
            },
          })
          .to(aboutWrapper, {
            height: '100%',
            borderColor: `${borderByTheme}00`,
          })
          .to(
            aboutOverlay,
            {
              opacity: 0,
            },
            '<',
          )
          .to(
            aboutSection,
            {
              scale: 1,
            },
            '<',
          )
          .to(aboutContent, {
            width: '40%',
          })
          .to(aboutSection, {
            opacity: 0,
          }),
      );
    }

    // #endregion

    // #region Objective animations

    const objectiveChars = objectiveText?.getElementsByClassName('char');

    const objectiveWords = Array.from(
      objectiveText?.getElementsByClassName('word'),
    ).filter((element) => {
      const word = element.getAttribute('data-word');
      return word === 'productos' || word === 'atemporales';
    });

    const clockLines = Array.from(
      document.getElementsByClassName('clock-line'),
    );

    if (![objectiveWords, clockLines].every(Boolean)) return;

    gsap.set(clockLines[0], { yPercent: -100, opacity: 0 });
    gsap.set(clockLines[1], { yPercent: 100, opacity: 0 });
    gsap.set(objectiveChars, {
      opacity: 0,
    });
    gsap.set(objectiveWords, {
      backgroundColor: 'transparent',
      transitionProperty: 'background-color, filter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
      transitionDuration: '150ms',
    });

    // Margin applied to make pin (objectiveSection) section overflow animation possible
    const designSectionMargin = designWrapper.clientHeight;

    gsap.set(designWrapper, {
      marginBottom: `-${designSectionMargin}px`,
      yPercent: -50,
    });

    masterTimeline.current.add(
      gsap
        .timeline({
          id: 'objective',
          onStart: () => {
            gsap.set(
              [
                objectiveSection,
                objectiveText,
                objectiveChars,
                clockLines,
                designWrapper,
              ],
              {
                willChange: 'transform, opacity',
              },
            );
          },
          scrollTrigger: {
            trigger: objectiveSection,
            start: 'center center',
            end: () => `+=${objectiveSection.offsetHeight * 3}`,
            scrub: true,
            pin: true,
          },
        })
        .to(objectiveChars, {
          opacity: 1,
          ease: 'circ.inOut',
          stagger: 0.07,
          duration: 3,
          delay: 2,
        })
        .to(
          clockLines,
          {
            opacity: 1,
            yPercent: 0,
            ease: 'linear',
            duration: 1,
          },
          '>-2',
        )
        .to(
          objectiveWords,
          {
            backgroundColor:
              resolvedTheme === 'dark'
                ? 'hsl(var(--palette-800))'
                : 'hsl(var(--palette-200))',
          },
          '>-1',
        )
        .to(
          objectiveSection,
          {
            opacity: 0.4,
            duration: 6,
            scale: 0.95,
          },
          '>+2',
        )
        .to(designWrapper, { yPercent: -100, duration: 10 }, '>-5'),
    );

    // #endregion

    // #region Development animations

    gsap.set(developmentContent, {
      marginTop: `${sectionMargin}px`,
      backgroundColor: `${bgByTheme}40`,
    });

    masterTimeline.current.add(
      gsap
        .timeline({
          id: 'development',
          onStart: () => {
            gsap.set(ringsContainer, { willChange: 'transform, opacity' });
            gsap.set(globe, { willChange: 'transform' });
          },
          scrollTrigger: {
            trigger: developmentContent,
            start: 'start center',
            end: () => `+=${developmentContent.offsetHeight * 0.2}`,
            scrub: true,
          },
        })
        .to(developmentContent, {
          backgroundColor: `${bgByTheme}95`,
        })
        .to(
          ringsContainer,
          { scale: 2, opacity: 0.2, ease: 'power1.inOut' },
          '<',
        )
        .to(globe, { scale: 1.5, ease: 'power1.inOut' }, '<'),
    );

    // #endregion

    return () => {
      clearTimeline();
    };
  }, [
    isPaletteFullfiled,
    palette,
    resolvedTheme,
    isMaxLgDevice,
    isXlDevice,
    isMounted,
  ]);

  // Development section elements pointer interaction
  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe || !isMounted || isMobileDevice === undefined) return;

      const rings = Array.from(document.getElementsByClassName('orbit-ring'));

      if (rings.length === 0) return;

      const { ringsContainer, globe, developmentSection } =
        elementsRef.current as Record<ElementDictionaryKey, HTMLElement>;

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

      observer.observe(developmentSection);

      // Cleanup Function
      return () => {
        window.removeEventListener('resize', resizeGlobe);
        document.removeEventListener('mousemove', handleMouseParallax);
        document.removeEventListener('mouseleave', restoreElementsPosition);
        observer.unobserve(developmentSection);
      };
    },
    [isMounted, isMobileDevice],
  );

  return null;
});

export default AnimationsProvider;
