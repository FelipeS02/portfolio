import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

export default function useHandleLoadingAnimations() {
  const slideUpLetters = useRef<HTMLElement[] | null>(null);

  const { contextSafe } = useGSAP(() => {
    const newSlideUpLetters =
      gsap.utils.toArray<HTMLElement>('[letter-slide-up]');

    if (!newSlideUpLetters) return;

    newSlideUpLetters.forEach((e) => {
      gsap.set(e.getElementsByClassName('char'), {
        yPercent: 100,
        opacity: 0,
        willChange: 'transform',
      });
    });

    slideUpLetters.current = newSlideUpLetters;
  });

  const onPageLoading = contextSafe((): GSAPTween[] => {
    if (!slideUpLetters.current) return [];

    return slideUpLetters.current?.map((e) => {
      return gsap.to(e.getElementsByClassName('char'), {
        yPercent: 0,
        duration: 0.7,
        ease: 'circ.inOut',
        stagger: 0.07,
        opacity: 1,
      });
    });
  });

  return { onPageLoading };
}
