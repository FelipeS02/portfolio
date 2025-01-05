'use client';

import { memo } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable,ScrollTrigger } from 'gsap/all';

import { useScheme, useTheme } from '@/hooks/theme';

import { ABOUT_ELEMENTS_IDS } from '../sections/about/about';
import { HOME_ELEMENT_IDS } from '../sections/home/home';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/objective/objective';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/services/development/development';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const AnimationsProvider = memo(function AnimationProvider() {
  const { resolvedTheme } = useScheme();
  const {
    palette: { hex: palette },
  } = useTheme();
  const mm = gsap.matchMedia();

  useGSAP(() => {
    const homeSection = document.getElementById(HOME_ELEMENT_IDS.SECTION);
    const aboutWrapper = document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER);
    const aboutOverlay = document.getElementById(ABOUT_ELEMENTS_IDS.OVERLAY);
    const aboutSection = document.getElementById(ABOUT_ELEMENTS_IDS.SECTION);
    const aboutContent = document.getElementById(ABOUT_ELEMENTS_IDS.CONTENT);

    if (
      !homeSection ||
      !aboutWrapper ||
      !aboutOverlay ||
      !aboutSection ||
      !aboutContent
    )
      return;

    mm.add('(min-width: 1280px)', () => {
      gsap.set(aboutWrapper, {
        height: 0,
        willChange: 'height',
        placeSelf: 'center',
        borderTop: 1,
        borderBottom: 1,
        borderColor: '#CCCCCC',
      });

      gsap.set(aboutOverlay, {
        background: '#000000',
        opacity: 1,
        willChange: 'opacity',
      });

      gsap.set(aboutSection, {
        scale: 0.75,
        willChange: 'transform',
      });

      gsap.set(aboutContent, {
        width: 0,
        willChange: 'width',
      });

      const aboutSectionTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: homeSection,
          start: 'top top',
          end: () => `+=${homeSection.offsetHeight * 2}`,
          scrub: true,
          pin: true,
        },
      });

      aboutSectionTimeline
        .to(aboutWrapper, {
          height: '100%',
          borderColor: 'transparent',
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
        });
    });
  });

  useGSAP(() => {
    const objectiveSection = document.getElementById(
      OBJECTIVE_ELEMENTS_IDS.SECTION,
    );

    if (!objectiveSection) return;

    const objectiveSectionText = document.getElementById(
      OBJECTIVE_ELEMENTS_IDS.TEXT,
    );

    if (!objectiveSectionText) return;

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
    const objectiveSectionTl = gsap.timeline({
      scrollTrigger: {
        trigger: objectiveSection,
        start: () => `${objectiveTriggerStart} bottom`,
        end: () => `+=${objectiveSection.clientHeight - objectiveTriggerStart}`,
        scrub: true,
      },
    });

    objectiveSectionTl
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
  }, [resolvedTheme]);

  useGSAP(
    (_, contextSafe) => {
      if (!contextSafe || !palette || !resolvedTheme) return;
      const developmentSection = document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.SECTION,
      );
      const developmentSectionContent = document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.CONTENT,
      );
      const developmentSectionHero = document.getElementById(
        DEVELOPMENT_ELEMENTS_IDS.HERO,
      );
      const globe = document.getElementById('3d-globe');
      const ringsContainer = document.getElementById('rings-container');
      const planetOrbit = document.getElementById('planet-orbit');

      if (
        !ringsContainer ||
        !planetOrbit ||
        !developmentSection ||
        !globe ||
        !developmentSectionHero ||
        !developmentSectionContent
      )
        return;

      // #region Development section content styling
      const bgByTheme = resolvedTheme === 'dark' ? '#111111' : '#ffffff';

      const sectionMargin =
        window.innerHeight - developmentSectionHero.offsetHeight;

      gsap.set(developmentSectionContent, {
        marginTop: `${sectionMargin}px`,
        backgroundColor: `${bgByTheme}40`,
      });

      gsap.to(developmentSectionContent, {
        backgroundColor: `${bgByTheme}95`,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: developmentSectionContent,
          start: 'start center',
          end: () => `+=${developmentSectionContent.offsetHeight * 0.2}`,
          scrub: true,
        },
      });

      // #endregion

      // #region Initial orbit rings config
      const rings = Array.from(
        developmentSection.getElementsByClassName('orbit-ring'),
      );

      if (!rings) return;

      mm.add('(max-width: 768px)', () => {
        rings.forEach((ring, index) => {
          const rotate = '20deg';
          if (index === rings.length - 1) {
            gsap.set(ring, {
              rotate,
            });
            return;
          }

          // Dynamic opacity to produce profundity on rings
          const opacity = Math.max(0, 90 + index * 2);
          // Calculate the padding for the current element
          const paddingValue = Math.max(0, 10 - index * 0.25);

          // Apply the padding
          gsap.set(ring, {
            padding: `${paddingValue}%`,
            opacity: `${opacity}%`,
            rotate,
          });
        });
      }).add('(min-width: 768px)', () => {
        rings.forEach((ring, index) => {
          const rotate = '20deg';
          if (index === rings.length - 1) {
            gsap.set(ring, {
              rotate,
            });
            return;
          }

          // Calculate the padding for the current element
          const paddingValue = Math.max(0, 10 - index * 0.25);
          // Using blur instead of opacity for more realism
          const blur = Math.max(0, 0.05 + index * 0.15);

          // Apply the padding
          gsap.set(ring, {
            padding: `${paddingValue}%`,
            filter: `blur(${blur}px)`,
            rotate,
          });
        });
      });
      // #endregion

      // #region globe resizing controller
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

      // Resize on init
      resizeGlobe();

      // Resize globe when window size change
      window.addEventListener('resize', resizeGlobe);
      // #endregion

      // #region Rings parallax managing
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
      mm.add('(min-width: 768px)', () => {
        document.addEventListener('mousemove', handleMouseParallax);
        document.addEventListener('mouseleave', restoreElementsPosition);
      });
      // #endregion
      // Cleanup function to prevent memory leaks
      return () => {
        window.removeEventListener('resize', resizeGlobe);
        document.removeEventListener('mousemove', handleMouseParallax);
        document.removeEventListener('mouseleave', restoreElementsPosition);
      };
    },
    [palette, resolvedTheme],
  );

  return null;
});

export default AnimationsProvider;
