'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { memo } from 'react';
import { ABOUT_ELEMENTS_IDS } from '../sections/About/About';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/Objective/Objective';
import { useScheme } from '@/hooks/theme';
import { SERVICES_TRANSITION_IDS } from '../sections/Services/Transition';

gsap.registerPlugin(ScrollTrigger);

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

      mm.add('(min-width: 768px)', () => {
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

      const servicesWrapper = document.getElementById(
        SERVICES_TRANSITION_IDS.WRAPPER
      );
      const servicesText = document.getElementById(
        SERVICES_TRANSITION_IDS.TEXT
      );

      if (servicesWrapper && servicesText) {
        gsap.set(servicesText, { willChange: 'transform, opacity' });

        // const servicesAnimationTl = gsap.timeline({
        //   scrollTrigger: {
        //     trigger: objectiveSection,
        //     start: () => `bottom+=${objectiveSection.clientHeight / 3} bottom`,
        //     end: () => `+=${servicesWrapper.offsetHeight}`,
        //     scrub: true,
        //     markers: true,
        //   },
        // });

        // // Primera mitad: servicesWrapper a opacity 1
        // servicesAnimationTl
        //   .fromTo(
        //     servicesWrapper,
        //     {  opacity: 0, willChange: 'opacity' },
        //     {
        //       opacity: 1,
        //       duration: 0.2, // Mitad de la duración total
        //     }
        //   )
        //   .to(servicesText, {
        //     scale: 2,
        //     opacity: 0,
        //     duration: 0.8, // Mitad de la duración total
        //   })
        //   .to(
        //     servicesWrapper,
        //     {
        //       opacity: 0,
        //       duration: 0.8, // Mitad de la duración total
        //     },
        //     '>' // Sincroniza con el segundo paso
        //   );

        gsap.to(servicesText, {
          opacity: 0,
          scale: 2,
          scrollTrigger: {
            trigger: servicesWrapper,
            start: 'bottom bottom',
            end: () => `+=${servicesWrapper.offsetHeight}`,
            markers: true,
            scrub: true,
            pin: true,
          },
        });
      }
    }
  }, [resolvedTheme]);

  return null;
});

export default AnimationsProvider;
