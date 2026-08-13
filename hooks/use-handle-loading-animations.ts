import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';

const SLIDE_UP_SELECTOR = '[letter-slide-up]';

const getSlideUpElements = () =>
  gsap.utils.toArray<HTMLElement>(SLIDE_UP_SELECTOR);

export default function useHandleLoadingAnimations() {
  // Hide the letters before the first paint, so the loading screen never lifts
  // on already-visible text
  const { contextSafe } = useGSAP(() => {
    getSlideUpElements().forEach((element) => {
      gsap.set(element.getElementsByClassName('char'), {
        yPercent: 100,
        opacity: 0,
        willChange: 'transform',
      });
    });
  });

  const onPageLoading = contextSafe((): GSAPTween[] => {
    // Elements are re-queried and tweened `fromTo` because a locale switch
    // replaces the chars with fresh nodes that carry none of the mount-time
    // state a plain `to` would need
    return getSlideUpElements().map((element) =>
      gsap.fromTo(
        element.getElementsByClassName('char'),
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'circ.inOut',
          stagger: 0.07,
        },
      ),
    );
  });

  return { onPageLoading };
}
