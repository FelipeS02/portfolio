import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

export default function useHandleLoadingAnimations() {
  // Disable hero animation on chrome due to malfunction
  const disableAnimation =
    navigator?.userAgent?.toLowerCase()?.includes('chrome');

  const { contextSafe } = useGSAP(
    () => {
      if (disableAnimation) return;
      const el = document.querySelector('[letter-slide-up]');
      if (el) {
        gsap.set(el.getElementsByClassName('char'), {
          yPercent: 100,
          opacity: 0,
          willChange: 'transform',
          position: 'static',
        });
      }
    },
    { dependencies: [disableAnimation] }
  );

  const onPageLoading = contextSafe(() => {
    if (disableAnimation) return;

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
