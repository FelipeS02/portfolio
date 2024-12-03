'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger, Draggable } from 'gsap/all';
import { memo } from 'react';
import { ABOUT_ELEMENTS_IDS } from '../sections/About/About';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/Objective/Objective';
import { useScheme } from '@/hooks/theme';
import { DEVELOPMENT } from '../sections/Services/Development/Development';

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const ABOUT_PARSED_IDS = {
  OVERLAY: `#${ABOUT_ELEMENTS_IDS.OVERLAY}`,
  SECTION: `#${ABOUT_ELEMENTS_IDS.SECTION}`,
  TEXT: `#${ABOUT_ELEMENTS_IDS.TEXT}`,
};

const AnimationsProvider = memo(function AnimationProvider() {
  const { resolvedTheme } = useScheme();

  useGSAP(() => {
    const homeEl = document.getElementById('home');
    const aboutWrapper = document.getElementById(ABOUT_ELEMENTS_IDS.WRAPPER);

    if (homeEl && aboutWrapper) {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1280px)', () => {
        gsap.set(aboutWrapper, {
          height: 0,
          willChange: 'height',
          placeSelf: 'center',
          borderTop: 1,
          borderBottom: 1,
          borderColor: '#CCCCCC',
        });

        gsap.set(ABOUT_PARSED_IDS.OVERLAY, {
          background: '#000000',
          opacity: 1,
          willChange: 'opacity',
        });

        gsap.set(ABOUT_PARSED_IDS.SECTION, {
          scale: 0.75,
          willChange: 'transform',
        });

        gsap.set(ABOUT_PARSED_IDS.TEXT, {
          width: 0,
          willChange: 'width',
        });

        const aboutSectionTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: homeEl,
            start: 'top top',
            end: () => `+=${homeEl.offsetHeight * 2}`,
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
            ABOUT_PARSED_IDS.OVERLAY,
            {
              opacity: 0,
            },
            '<'
          )
          .to(
            ABOUT_PARSED_IDS.SECTION,
            {
              scale: 1,
            },
            '<'
          )
          .to(ABOUT_PARSED_IDS.TEXT, {
            width: '40%',
          });
      });
    }
  });

  useGSAP(() => {
    const objectiveSection = document.getElementById(
      OBJECTIVE_ELEMENTS_IDS.SECTION
    );

    if (objectiveSection) {
      const objectiveSectionText = document.getElementById(
        OBJECTIVE_ELEMENTS_IDS.TEXT
      );

      if (!objectiveSectionText) return;

      const objectiveChars =
        objectiveSectionText?.getElementsByClassName('char');

      const objectiveWords = Array.from(
        objectiveSectionText?.getElementsByClassName('word')
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
          end: () =>
            `+=${objectiveSection.clientHeight - objectiveTriggerStart}`,
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
    }
  }, [resolvedTheme]);

  useGSAP((_, contextSafe) => {
    if (!contextSafe) return;
    const developmentSection = document.getElementById(DEVELOPMENT.SECTION);
    const globe = document.getElementById('3d-globe');

    if (!developmentSection || !globe) return;
    const rings = Array.from(
      developmentSection.getElementsByClassName('orbit-ring')
    );

    if (!rings) return;

    const resizeGlobe = contextSafe(() => {
      const lastRing = rings.at(-1) as HTMLElement;

      gsap.set(globe, {
        maxWidth: `${lastRing.offsetWidth}px`,
        maxHeight: `${lastRing.offsetHeight}px`,
      });
    });

    // Apply padding
    rings.forEach((ring, index) => {
      const opacity = Math.max(0, 65 + index * 5);
      const rotate = '20deg';
      if (index === rings.length - 1) {
        gsap.set(ring, {
          rotate,
        });
        return;
      }
      // Calculate the padding for the current element
      const paddingValue = Math.max(0, 10 - index * 0.25);

      // Apply the padding
      gsap.set(ring, {
        padding: `${paddingValue}%`,
        opacity: `${opacity}%`,
        rotate,
      });
    });

    // Resize on init
    resizeGlobe();

    // Resize globe when window size change
    window.addEventListener('resize', resizeGlobe);

    // Cleanup function to prevent memory leaks
    return () => {
      window.removeEventListener('resize', resizeGlobe);
    };
  });

  return null;
});

export default AnimationsProvider;
