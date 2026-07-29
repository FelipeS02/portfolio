'use client';

import { FC, ReactNode, useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { COARSE_POINTER_QUERY, mediaQueryMatches } from '@/lib/dom';

/**
 * Owns the self-contained animations of the orbit: rings rotation, pointer
 * parallax and sizing the globe to the ring that visually contains it.
 *
 * Scroll-driven tweens for this section still live in AnimationsProvider,
 * since they are choreographed against other sections (the footer).
 */
const OrbitInteractions: FC<{ children: ReactNode }> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = containerRef.current;

      if (!root || !contextSafe) return;

      const select = gsap.utils.selector(root);

      const rings = select('.orbit-ring') as HTMLElement[];
      const ringsContainer = select('#rings-container')[0] as HTMLElement;
      const globe = select('#globe')[0] as HTMLElement;

      if (!rings.length || !ringsContainer || !globe) return;

      // Opacity and padding settings
      rings.forEach((ring, index) => {
        gsap.set(ring, {
          padding: `${Math.max(0, 10 - index * 0.25)}%`,
          opacity: `${Math.max(0, 80 + index * 2)}%`,
        });
      });

      const containerRing = rings.at(-5);

      // Match the globe to the ring that visually contains it
      const resizeGlobe = contextSafe(() => {
        if (!containerRing) return;

        const size = {
          width: `${containerRing.offsetWidth}px`,
          height: `${containerRing.offsetHeight}px`,
        };

        gsap.set(globe, size);
        gsap.set(globe.getElementsByTagName('canvas'), size);
      });

      resizeGlobe();
      window.addEventListener('resize', resizeGlobe);

      const handleMouseParallax = contextSafe((event: MouseEvent) => {
        const baseDeltaX = event.clientX - window.innerWidth / 2;
        const baseDeltaY = event.clientY - window.innerHeight / 2;

        const getDeltaValues = (multiplicator: number) => ({
          x: baseDeltaX * multiplicator,
          y: baseDeltaY * multiplicator,
        });

        gsap.to(rings, { ...getDeltaValues(0.009), duration: 0.75 });
        gsap.to(globe, { ...getDeltaValues(0.05), duration: 0.75 });
      });

      const restoreElementsPosition = contextSafe(() => {
        gsap.to([...rings, globe], {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'back.out',
        });
      });

      const removePointerListeners = () => {
        document.removeEventListener('mousemove', handleMouseParallax);
        document.removeEventListener('mouseleave', restoreElementsPosition);
      };

      const ringsRotation = gsap.to(ringsContainer, {
        rotation: 360,
        duration: 60,
        transformOrigin: 'center center',
        repeat: -1,
        ease: 'linear',
      });

      // Idle the orbit while it is out of the viewport
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          ringsRotation.pause();
          removePointerListeners();

          return;
        }

        if (!mediaQueryMatches(COARSE_POINTER_QUERY)) {
          document.addEventListener('mousemove', handleMouseParallax);
          document.addEventListener('mouseleave', restoreElementsPosition);
        }

        ringsRotation.play();
      });

      observer.observe(root);

      return () => {
        window.removeEventListener('resize', resizeGlobe);
        observer.disconnect();
        removePointerListeners();
      };
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      id='planet-orbit'
      className='sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden'
    >
      {children}
    </div>
  );
};

export default OrbitInteractions;
