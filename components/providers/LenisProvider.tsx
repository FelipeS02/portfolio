'use client';

import gsap from 'gsap';
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { LenisRef, ReactLenis } from 'lenis/react';

const LenisProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const lenisRef = useRef<LenisRef | null>(null);

  const handleLenisRef = useCallback((node: LenisRef) => {
    if (!node?.lenis) return;

    lenisRef.current = node;

    // #region integration with GSAP
    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures Lenis's smooth scroll animation updates on each GSAP tick
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    // Disable lag smoothing in GSAP to prevent any delay in scroll animations
    gsap.ticker.lagSmoothing(0);
    // #endregion

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.15,
        wheelMultiplier: 0.7,
        gestureOrientation: 'vertical',
        smoothWheel: true,
        autoRaf: false,
      }}
      ref={handleLenisRef}
    >
      {children}
    </ReactLenis>
  );
};

export default LenisProvider;
