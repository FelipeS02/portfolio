import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap/gsap-core';
import { useCallback, useEffect, useState } from 'react';

export default function useHandleLoadingAnimations() {
  const [disableAnimation, setDisableAnimation] = useState(false);

  // Disable hero animation on chrome due to malfunction
  useEffect(() => {
    setDisableAnimation(
      navigator?.userAgent?.toLowerCase()?.includes('chrome')
    );
  }, []);

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

  const onPageLoading = useCallback(
    () =>
      contextSafe(() => {
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
      }),
    [contextSafe, disableAnimation]
  );

  return { onPageLoading };
}
