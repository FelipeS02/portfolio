'use client';

import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';
import { useDebounceValue, useMediaQuery } from 'usehooks-ts';

import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/services/development/development';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

type ElementDictionaryKey =
  | 'homeSection'
  | 'aboutWrapper'
  | 'aboutOverlay'
  | 'aboutSection'
  | 'aboutContent'
  | 'objectiveSection'
  | 'objectiveText'
  | 'developmentContent'
  | 'developmentHero'
  | 'globe'
  | 'ringsContainer'
  | 'planetOrbit'
  | 'developmentSection';

const AnimationsProvider = memo(function AnimationProvider() {
  const { resolvedTheme } = useScheme();
  const {
    palette: { hex: palette },
    fullfiled: isPaletteFullfiled,
  } = useTheme();

  const elementsRef = useRef<Record<ElementDictionaryKey, HTMLElement> | null>(
    null,
  );

  const isMobileDevice = useMediaQuery('(any-pointer: coarse)');

  const masterTimeline = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  const clearTimeline = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const [willUpdate, setWillUpdate] = useDebounceValue<boolean>(true, 150);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const elements = {
      // Home elements
      homeSection: document.getElementById(HOME_ELEMENT_IDS.SECTION),
      aboutWrapper: document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER),
      aboutOverlay: document.getElementById(ABOUT_ELEMENTS_IDS.OVERLAY),
      aboutSection: document.getElementById(ABOUT_ELEMENTS_IDS.SECTION),
      aboutContent: document.getElementById(ABOUT_ELEMENTS_IDS.CONTENT),

      // Objective elements
      objectiveSection: document.getElementById(OBJECTIVE_ELEMENTS_IDS.SECTION),
      objectiveText: document.getElementById(OBJECTIVE_ELEMENTS_IDS.TEXT),

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
    if (!isMounted) return;

    const mm = gsap.matchMedia();

    if (!isPaletteFullfiled || !resolvedTheme) return;

    const borderByTheme =
      resolvedTheme === 'dark' ? palette[700] : palette[400];
    const bgByTheme = '#111111';

    const {
      homeSection,
      aboutWrapper,
      aboutOverlay,
      aboutSection,
      aboutContent,
      objectiveSection,
      objectiveText,
      developmentContent,
      developmentHero,
      globe,
      ringsContainer,
    } = elementsRef.current as Record<ElementDictionaryKey, HTMLElement>;

    const sectionMargin = window.innerHeight - developmentHero.offsetHeight;

    clearTimeline();

    // #region Home section animations

    mm.add('(min-width: 1280px)', () => {
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
            scrollTrigger: {
              trigger: homeSection,
              start: 'top top',
              end: () => `+=${homeSection.offsetHeight * 2}`,
              scrub: true,
              pin: true,
            },
          })
          .set(aboutWrapper, { willChange: 'height' })
          .set(aboutOverlay, { willChange: 'opacity' })
          .set(aboutSection, { willChange: 'transform' })
          .set(aboutContent, { willChange: 'width' })
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
          }),
      );
    });

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

    if (
      objectiveChars.length === 0 ||
      objectiveWords.length === 0 ||
      clockLines.length === 0
    )
      return;

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

    masterTimeline.current.add(
      gsap
        .timeline({
          id: 'objective',
          scrollTrigger: {
            trigger: objectiveSection,
            start: () => `bottom bottom`,
            end: () => `+=${objectiveSection.offsetHeight * 2.25}`,
            scrub: true,
            pin: true,
          },
        })
        .set(clockLines, { willChange: 'transform' })
        .set(objectiveChars, { willChange: 'opacity' })
        .to(objectiveChars, {
          opacity: 1,
          ease: 'circ.inOut',
          stagger: 0.07,
          duration: 3,
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
        ),
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
          scrollTrigger: {
            trigger: developmentContent,
            start: 'start center',
            end: () => `+=${developmentContent.offsetHeight * 0.2}`,
            scrub: true,
          },
        })
        .set(ringsContainer, { willChange: 'transform, opacity' })
        .set(globe, { willChange: 'transform' })
        .to(developmentContent, {
          backgroundColor: `${bgByTheme}95`,
        })
        .to(
          ringsContainer,
          { scale: 2, opacity: 0.2, ease: 'power1.inOut' },
          '<',
        )
        .to(globe, { scale: 1.25, ease: 'power1.inOut' }, '<'),
    );

    // #endregion

    return () => {
      clearTimeline();
    };
  }, [isPaletteFullfiled, palette, resolvedTheme, willUpdate, isMounted]);

  // Handle resize to preserve timeline funcionality
  useEffect(() => {
    const onResize = () => {
      if (isMobileDevice) return;
      setWillUpdate(!willUpdate);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [setWillUpdate, willUpdate, isMobileDevice]);

  // Development section elements pointer interaction
  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe || !isMounted) return;

      const mm = gsap.matchMedia();

      const rings = Array.from(document.getElementsByClassName('orbit-ring'));

      if (rings.length === 0) return;

      const { ringsContainer, globe, developmentSection } =
        elementsRef.current as Record<ElementDictionaryKey, HTMLElement>;

      // Mobile Rings Setup
      mm.add('(max-width: 768px)', () => {
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
            padding: `${paddingValue}%`,
            opacity: `${opacity}%`,
            rotate,
          });
        });
      });

      // Desktop Rings Setup
      mm.add('(min-width: 768px)', () => {
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
            padding: `${paddingValue}%`,
            filter: `blur(${blur}px)`,
            rotate,
          });
        });
      });

      // Globe Resize Handler
      const resizeGlobe = contextSafe(() => {
        const lastRing = rings.at(-1) as HTMLElement;

        gsap.set(globe, {
          width: `${lastRing.offsetWidth}px`,
          height: `${lastRing.offsetHeight}px`,
        });

        gsap.set(globe.getElementsByTagName('canvas'), {
          width: `${lastRing.offsetWidth}px`,
          height: `${lastRing.offsetHeight}px`,
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

        mm.add('(min-width: 768px)', () => {
          document.addEventListener('mousemove', handleMouseParallax);
          document.addEventListener('mouseleave', restoreElementsPosition);
        });

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
    [isMounted],
  );

  return null;
});

export default AnimationsProvider;
