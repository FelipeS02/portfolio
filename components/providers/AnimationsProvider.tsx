'use client';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { memo } from 'react';
import { ABOUT_ELEMENTS_IDS } from '../sections/About/About';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_OVERLAY = `#${ABOUT_ELEMENTS_IDS.OVERLAY}`;
const ABOUT_SECTION = `#${ABOUT_ELEMENTS_IDS.SECTION}`;
const ABOUT_TEXT = `#${ABOUT_ELEMENTS_IDS.TEXT}`;

const AnimationsProvider = memo(function AnimationProvider() {
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

        gsap.set(ABOUT_OVERLAY, {
          background: '#000000',
          opacity: 1,
          willChange: 'opacity',
        });

        gsap.set(ABOUT_SECTION, {
          scale: 0.75,
        });

        gsap.set(ABOUT_TEXT, {
          width: 0,
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
            ABOUT_OVERLAY,
            {
              opacity: 0,
            },
            '<'
          )
          .to(
            ABOUT_SECTION,
            {
              scale: 1,
            },
            '<'
          )
          .to(ABOUT_TEXT, {
            width: '40%',
          });
      });
    }
  });

  return null;
});

export default AnimationsProvider;
