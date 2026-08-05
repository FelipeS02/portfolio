'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { Fsaracho, FsarachoMobile } from '@/components/common/fsaracho';

import { useMediaQueries } from '@/hooks/use-media-queries';

// Horizontal band around the cursor's x position, ignoring y entirely —
// linear-gradient stops fill the full height on their own, so opacity
// falls off across the whole word regardless of how far down the page the
// cursor is. Mirrors the old per-letter x-distance opacity falloff.
const maskImage = (threshold: number) =>
  `linear-gradient(90deg, transparent calc(var(--mx, -9999px) - ${threshold}px), #000 var(--mx, -9999px), transparent calc(var(--mx, -9999px) + ${threshold}px))`;

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

      if (!root || !baseWrap) return;

      // Same falloff distance as the old letter-by-letter reveal
      const threshold = md ? 150 : 400;
      const mask = maskImage(threshold);

      baseWrap.style.setProperty('mask-image', mask);
      baseWrap.style.setProperty('-webkit-mask-image', mask);

      // Tween a plain proxy instead of the CSS var directly — gsap writes
      // custom properties as bare numbers with no unit, which breaks the
      // calc() expressions in the mask. Format the px string ourselves.
      const pos = { x: -9999 };
      const setX = gsap.quickTo(pos, 'x', {
        duration: 0.3,
        ease: 'power2.out',
        onUpdate: () => root.style.setProperty('--mx', `${pos.x}px`),
      });

      const updateSpot = ({ clientX }: MouseEvent) => {
        const rect = baseWrap.getBoundingClientRect();
        setX(clientX - rect.left);
      };

      // Safety net for when the cursor leaves the browser window entirely
      const resetSpot = () => setX(-9999);

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

      <div id='fsaracho-base-wrap-mobile' className='w-full h-fit md:hidden'>
        <FsarachoMobile className='w-full h-fit' />
      </div>
    </div>
  );
};

export default FooterText;
