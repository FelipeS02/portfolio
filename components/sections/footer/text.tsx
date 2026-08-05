'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import {
  Fsaracho,
  FsarachoGlow,
  FsarachoGlowMobile,
  FsarachoMobile,
} from '@/components/common/fsaracho';

import { useMediaQueries } from '@/hooks/use-media-queries';

const MASK_IMAGE =
  'radial-gradient(circle var(--mr, 0px) at var(--mx, -9999px) var(--my, -9999px), #000 0%, transparent 60%)';

const FooterText = () => {
  const [md, mobile] = useMediaQueries([
    '(max-width: 768px)',
    '(any-pointer: coarse)',
  ]);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (mobile) return;

      const root = container.current;
      const suffix = md ? 'mobile' : 'desktop';
      const baseWrap = document.getElementById(`fsaracho-base-wrap-${suffix}`);
      const glowWrap = document.getElementById(`fsaracho-glow-wrap-${suffix}`);

      if (!root || !baseWrap || !glowWrap) return;

      // Spot radius in CSS px, relative to the word's own box
      const radius = md ? 180 : 260;
      // Distance from the word's box beyond which the spot fully closes
      const threshold = md ? 220 : 380;

      [baseWrap, glowWrap].forEach((el) => {
        el.style.setProperty('mask-image', MASK_IMAGE);
        el.style.setProperty('-webkit-mask-image', MASK_IMAGE);
      });

      // Tween a plain proxy instead of the CSS vars directly — gsap writes
      // custom properties as bare numbers with no unit, which makes
      // var(--mx, -9999px) invalid (unit mismatch) and kills the whole
      // mask-image. Format the px strings ourselves in onUpdate instead.
      // mx/my/mr live on the shared ancestor so both wraps inherit the
      // same reveal circle — base and glow open/close together.
      const pos = { x: 0, y: 0, r: 0 };
      const setX = gsap.quickTo(pos, 'x', {
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => root.style.setProperty('--mx', `${pos.x}px`),
      });
      const setY = gsap.quickTo(pos, 'y', {
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => root.style.setProperty('--my', `${pos.y}px`),
      });
      const setR = gsap.quickTo(pos, 'r', {
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => root.style.setProperty('--mr', `${Math.max(pos.r, 0)}px`),
      });

      const updateSpot = ({ clientX, clientY }: MouseEvent) => {
        const rect = baseWrap.getBoundingClientRect();

        // Distance from the cursor to the word's own box (0 while inside it)
        const dx = Math.max(rect.left - clientX, 0, clientX - rect.right);
        const dy = Math.max(rect.top - clientY, 0, clientY - rect.bottom);
        const distance = Math.hypot(dx, dy);

        const proximity = gsap.utils.clamp(
          0,
          1,
          gsap.utils.mapRange(0, threshold, 1, 0, distance),
        );

        setX(clientX - rect.left);
        setY(clientY - rect.top);
        setR(radius * proximity);
      };

      // Safety net for when the cursor leaves the browser window entirely —
      // no more mousemove events fire past that point to close the spot
      const resetSpot = () => {
        setR(0);
      };

      document.addEventListener('mousemove', updateSpot);
      document.addEventListener('mouseleave', resetSpot);

      // Clear listeners on unmount
      return () => {
        document.removeEventListener('mousemove', updateSpot);
        document.removeEventListener('mouseleave', resetSpot);
      };
    },
    {
      scope: container,
      dependencies: [mobile, md],
      revertOnUpdate: true,
    },
  );

  return (
    <div className='relative w-full' ref={container}>
      <div
        id='fsaracho-base-wrap-desktop'
        className='w-full h-fit max-md:hidden'
      >
        <Fsaracho className='w-full h-fit' />
      </div>
      <div
        id='fsaracho-glow-wrap-desktop'
        className='absolute inset-0 w-full h-fit max-md:hidden pointer-events-none'
      >
        <FsarachoGlow className='w-full h-fit' />
      </div>

      <div id='fsaracho-base-wrap-mobile' className='w-full h-fit md:hidden'>
        <FsarachoMobile className='w-full h-fit' />
      </div>
      <div
        id='fsaracho-glow-wrap-mobile'
        className='absolute inset-0 w-full h-fit md:hidden pointer-events-none'
      >
        <FsarachoGlowMobile className='w-full h-fit' />
      </div>
    </div>
  );
};

export default FooterText;
