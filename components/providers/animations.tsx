'use client';

import { memo, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';

import { persistedTimeline } from '@/lib/animations';
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

  const mm = gsap.matchMedia();

  const homeTimeline = useRef<GSAPTimeline | null>(null);
  const developmentTimeline = useRef<GSAPTimeline | null>(null);

  // #region Home
  useGSAP(() => {
    const el = {
      homeSection: document.getElementById(HOME_ELEMENT_IDS.SECTION),
      aboutWrapper: document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER),
      aboutOverlay: document.getElementById(ABOUT_ELEMENTS_IDS.OVERLAY),
      aboutSection: document.getElementById(ABOUT_ELEMENTS_IDS.SECTION),
      aboutContent: document.getElementById(ABOUT_ELEMENTS_IDS.CONTENT),
    } as Record<string, HTMLElement>;

    if (!Object.entries(el).every((el) => Boolean(el)) || !isPaletteFullfiled)
      return;

    const borderByTheme =
      resolvedTheme === 'dark' ? palette[300] : palette[600];

    mm.add('(min-width: 1280px)', () => {
      gsap.set(el.aboutWrapper, {
        height: 0,
        willChange: 'height',
        placeSelf: 'center',
        borderColor: borderByTheme,
        borderTop: 1,
        borderBottom: 1,
      });

      gsap.set(el.aboutOverlay, {
        background: '#000000',
        opacity: 1,
        willChange: 'opacity',
      });

      gsap.set(el.aboutSection, {
        scale: 0.75,
        willChange: 'transform',
      });

      gsap.set(el.aboutContent, {
        width: 0,
        willChange: 'width',
      });

      const timeline = persistedTimeline(homeTimeline, {
        scrollTrigger: {
          trigger: el.homeSection,
          start: 'top top',
          end: () => `+=${el.homeSection.offsetHeight * 2}`,
          scrub: true,
          pin: true,
        },
      });

      // Clear old tweens
      timeline.clear();

      timeline
        .to(el.aboutWrapper, {
          height: '100%',
          borderColor: `${borderByTheme}00`,
        })
        .to(
          el.aboutOverlay,
          {
            opacity: 0,
          },
          '<',
        )
        .to(
          el.aboutSection,
          {
            scale: 1,
          },
          '<',
        )
        .to(el.aboutContent, {
          width: '40%',
        });
    });
  }, [palette, isPaletteFullfiled, resolvedTheme]);
  // #endregion

  // #region Objective
  useGSAP(() => {
    const objectiveSection = document.getElementById(
      OBJECTIVE_ELEMENTS_IDS.SECTION,
    );
    const objectiveSectionText = document.getElementById(
      OBJECTIVE_ELEMENTS_IDS.TEXT,
    );

    if (!objectiveSection || !objectiveSectionText) return;

    const objectiveChars = objectiveSectionText?.getElementsByClassName('char');

    const objectiveWords = Array.from(
      objectiveSectionText?.getElementsByClassName('word'),
    ).filter((element) => {
      const word = element.getAttribute('data-word');
      return word === 'productos' || word === 'atemporales';
    });

    if (!objectiveChars) return;

    gsap.set(objectiveChars, {
      opacity: 0.5,
      willChange: 'opacity',
    });

    gsap.set(objectiveWords, {
      backgroundColor: 'transparent',
      transitionProperty: 'background-color, filter',
      transitionTimingFunction: 'cubic-bezier(0.4, 0, 1, 1)',
      transitionDuration: '150ms',
    });

    const objectiveTriggerStart = objectiveSection.clientHeight * 0.4;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: objectiveSection,
        start: () => `${objectiveTriggerStart} bottom`,
        end: () => `+=${objectiveSection.clientHeight - objectiveTriggerStart}`,
        scrub: true,
      },
    });

    timeline
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
      });
  }, [palette, isPaletteFullfiled, resolvedTheme]);
  // #endregion

  // #region Development
  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe || !isPaletteFullfiled || !resolvedTheme) return;

      const el = {
        developmentSection: document.getElementById(
          DEVELOPMENT_ELEMENTS_IDS.SECTION,
        ),
        developmentSectionContent: document.getElementById(
          DEVELOPMENT_ELEMENTS_IDS.CONTENT,
        ),
        developmentSectionHero: document.getElementById(
          DEVELOPMENT_ELEMENTS_IDS.HERO,
        ),
        globe: document.getElementById('3d-globe'),
        ringsContainer: document.getElementById('rings-container'),
        planetOrbit: document.getElementById('planet-orbit'),
      } as Record<string, HTMLElement>;

      if (!Object.entries(el).every((element) => Boolean(element))) return;

      // Development Section Styling
      const bgByTheme = '#111111';
      const sectionMargin =
        window.innerHeight - el.developmentSectionHero.offsetHeight;

      // Orbit Rings Configuration
      const ringsRotation = gsap.to(el.ringsContainer, {
        rotation: 360,
        duration: 60,
        transformOrigin: 'center center',
        repeat: -1,
        ease: 'linear',
      });

      const rings = Array.from(
        el.developmentSection.getElementsByClassName('orbit-ring'),
      );

      if (!rings) return;

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

        gsap.set(el.globe, {
          width: `${lastRing.offsetWidth}px`,
          height: `${lastRing.offsetHeight}px`,
        });

        gsap.set(el.globe.getElementsByTagName('canvas'), {
          width: `${lastRing.offsetWidth}px`,
          height: `${lastRing.offsetHeight}px`,
        });
      });

      resizeGlobe();
      window.addEventListener('resize', resizeGlobe);

      // Parallax Effect Handlers
      const handleMouseParallax = contextSafe((event: MouseEvent) => {
        gsap.set(rings, { willChange: 'transform' });
        gsap.set(el.globe, { willChange: 'transform' });

        const ringsDeltaX = (event.clientX - window.innerWidth / 2) * 0.01;
        const ringsDeltaY = (event.clientY - window.innerHeight / 2) * 0.01;

        const globeDeltaX = (event.clientX - window.innerWidth / 2) * 0.05;
        const globeDeltaY = (event.clientY - window.innerHeight / 2) * 0.05;

        gsap.to(rings, { x: ringsDeltaX, y: ringsDeltaY, duration: 0.75 });
        gsap.to(el.globe, { x: globeDeltaX, y: globeDeltaY, duration: 0.75 });
      });

      const restoreElementsPosition = contextSafe(() => {
        gsap.to(rings, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'back.out',
          willChange: 'none',
        });
        gsap.to(el.globe, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'back.out',
          willChange: 'none',
        });
      });

      // Desktop Parallax Setup

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

      observer.observe(el.developmentSection);

      // Development Section Content Animation
      gsap.set(el.developmentSectionContent, {
        marginTop: `${sectionMargin}px`,
        backgroundColor: `${bgByTheme}40`,
      });

      const timeline = persistedTimeline(developmentTimeline, {
        scrollTrigger: {
          trigger: el.developmentSectionContent,
          start: 'start center',
          end: () => `+=${el.developmentSectionContent.offsetHeight * 0.2}`,
          scrub: true,
        },
      });

      // Clear old tweens
      timeline.clear();

      timeline
        .set(el.ringsContainer, { willChange: 'transform, opacity' })
        .set(el.globe, { willChange: 'transform' })
        .to(el.developmentSectionContent, {
          backgroundColor: `${bgByTheme}95`,
        })
        .to(
          el.ringsContainer,
          { scale: 2, opacity: 0.2, ease: 'power1.inOut' },
          '<',
        )
        .to(el.globe, { scale: 1.25, ease: 'power1.inOut' }, '<');

      // Cleanup Function
      return () => {
        window.removeEventListener('resize', resizeGlobe);
        document.removeEventListener('mousemove', handleMouseParallax);
        document.removeEventListener('mouseleave', restoreElementsPosition);
        observer.unobserve(el.developmentSection);
      };
    },
    [palette, resolvedTheme, isPaletteFullfiled],
  );
  // #endregion
  return null;
});

export default AnimationsProvider;
