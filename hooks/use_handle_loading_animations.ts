import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

export default function useHandleLoadingAnimations() {
  const { contextSafe } = useGSAP(() => {
    const el = document.querySelector('[letter-slide-up]');
    if (el) {
      gsap.set(el.getElementsByClassName('char'), {
        yPercent: 100,
        opacity: 0,
        willChange: 'transform',
      });
    }
  });

  const onPageLoading = contextSafe(() => {
    const el = document.querySelector('[letter-slide-up]');

    if (el) {
      gsap.to(el.getElementsByClassName('char'), {
        yPercent: 0,
        duration: 0.7,
        ease: 'circ.inOut',
        stagger: 0.07,
        opacity: 1,
      });
    }
  });

  return { onPageLoading };
}
