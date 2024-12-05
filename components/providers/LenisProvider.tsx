'use client';

import gsap from 'gsap';
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { LenisRef, ReactLenis } from 'lenis/react';
import { OBJECTIVE_ELEMENTS_IDS } from '../sections/Objective/Objective';
import { ABOUT_ELEMENTS_IDS } from '../sections/About/About';
import { HOME_ELEMENT_IDS } from '../sections/Home/Home';
import { DESIGN_ELEMENTS_IDS } from '../sections/Services/Design/Design';
import { DEVELOPMENT_ELEMENTS_IDS } from '../sections/Services/Development/Development';
import Snap from 'lenis/snap';

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
        lerp: 0.1,
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
