'use client';

import { memo, useCallback, useEffect, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';
import { useDebounceValue } from 'usehooks-ts';

import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/services/development/development';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const AnimationsProvider = memo(function AnimationProvider() {
  const { resolvedTheme } = useScheme();
  const {
    palette: { hex: palette },
    fullfiled: isPaletteFullfiled,
  } = useTheme();

  const masterTimeline = useRef<GSAPTimeline>(gsap.timeline({ paused: true }));

  const clearTimeline = useCallback(() => {
    ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  const [willUpdate, setWillUpdate] = useDebounceValue<boolean>(true, 250);

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe) return;

      const mm = gsap.matchMedia();

      if (!isPaletteFullfiled || !resolvedTheme) return;

      const borderByTheme =
        resolvedTheme === 'dark' ? palette[300] : palette[600];
      const bgByTheme = '#111111';

      const elements = {
        // Home elements
        homeSection: document.getElementById(HOME_ELEMENT_IDS.SECTION),
        aboutWrapper: document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER),
        aboutOverlay: document.getElementById(ABOUT_ELEMENTS_IDS.OVERLAY),
        aboutSection: document.getElementById(ABOUT_ELEMENTS_IDS.SECTION),
        aboutContent: document.getElementById(ABOUT_ELEMENTS_IDS.CONTENT),

        // Objective elements
        objectiveSection: document.getElementById(
          OBJECTIVE_ELEMENTS_IDS.SECTION,
        ),
        objectiveText: document.getElementById(OBJECTIVE_ELEMENTS_IDS.TEXT),

        // Development elements
        developmentContent: document.getElementById(
          DEVELOPMENT_ELEMENTS_IDS.CONTENT,
        ),
        developmentHero: document.getElementById(DEVELOPMENT_ELEMENTS_IDS.HERO),
        globe: document.getElementById('3d-globe'),
        ringsContainer: document.getElementById('rings-container'),
        planetOrbit: document.getElementById('planet-orbit'),
      } as Record<string, HTMLElement>;

      // Ensure all elements exist
      if (!Object.values(elements).every(Boolean)) return;

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
      } = elements;

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

      gsap.set(objectiveChars, {
        opacity: 0.5,
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
              start: () => `${objectiveSection.clientHeight * 0.4} bottom`,
              end: () =>
                `+=${objectiveSection.clientHeight - objectiveSection.clientHeight * 0.6}`,
              scrub: true,
            },
          })
          .set(objectiveChars, { willChange: 'opacity' })
          .to(objectiveChars, {
            opacity: 1,
            ease: 'circ.inOut',
            stagger: 0.07,
          })
          .to(objectiveWords, {
            backgroundColor:
              resolvedTheme === 'dark'
                ? 'hsl(var(--palette-800))'
                : 'hsl(var(--palette-200))',
          }),
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
    },
    [isPaletteFullfiled, palette, resolvedTheme, willUpdate],
  );

  useEffect(() => {
    const onResize = () => setWillUpdate(!willUpdate);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [setWillUpdate, willUpdate]);

  useGSAP((_, contextSafe) => {
    if (!contextSafe) return;

    const mm = gsap.matchMedia();

    const elements = {
      // Development elements
      developmentSection: document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.SECTION,
      ),
      globe: document.getElementById('3d-globe'),
      ringsContainer: document.getElementById('rings-container'),
    } as Record<string, HTMLElement>;

    const rings = Array.from(document.getElementsByClassName('orbit-ring'));

    if (!Object.entries(elements).every(Boolean) || rings.length === 0) return;

    const { ringsContainer, globe, developmentSection } = elements;

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
  }, []);

  return null;
});

export default AnimationsProvider;
