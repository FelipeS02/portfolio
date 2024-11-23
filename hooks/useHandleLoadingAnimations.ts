import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

const HERO_TEXT_CHARS = '.char';

export default function useHandleLoadingAnimations() {
  const { contextSafe } = useGSAP(() => {
    gsap.set(HERO_TEXT_CHARS, {
      yPercent: 100,
      opacity: 0,
      willChange: 'transform',
    });
  }, {});

  const onPageLoading = contextSafe(() => {
    gsap.to(HERO_TEXT_CHARS, {
      yPercent: 0,
      duration: 0.7,
      ease: 'circ.inOut',
      stagger: 0.07,
      opacity: 1,
    });
  });

  return { onPageLoading };
}
