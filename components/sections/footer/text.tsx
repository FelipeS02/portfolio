'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { SplittedWord } from '@/components/ui/splitted-text';

import { useTheme } from '@/hooks/theme';
import { useMediaQueries } from '@/hooks/use-media-queries';

import styles from './text.module.css';

const FooterText = () => {
  const {
    palette: { hsl: palette },
  } = useTheme();

  const [md, mobile] = useMediaQueries([
    '(max-width: 768px)',
    '(any-pointer: coarse)',
  ]);

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (mobile) return;

      const letters = gsap.utils.toArray<HTMLSpanElement>('.char');

      gsap.set(letters, { color: 'hsla(0, 0%, 7%, 100%)' });

      // Range of activation
      const threshold = md ? 150 : 400;

      const updateBackground = ({ clientX }: MouseEvent) => {
        letters.forEach((letter) => {
          const { left, width } = letter.getBoundingClientRect();

          const center = left + width / 2;
          const distance = Math.abs(clientX - center);

          // Distance mapping
          const opacity = gsap.utils.mapRange(0, threshold, 1, 0, distance);
          const clampedOpacity = gsap.utils.clamp(0, 1, opacity);

          gsap.to(letter, {
            color: `hsla(0, 0%, 100%, ${clampedOpacity})`, // Fondo blanco con opacidad
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      };

      // Clear effect when cursor is out window
      const resetBackground = () => {
        letters.forEach((letter) => {
          gsap.to(letter, {
            color: 'transparent',
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      };

      document.addEventListener('mousemove', updateBackground);
      document.addEventListener('mouseleave', resetBackground);

      // Clear listeners on unmount
      return () => {
        document.removeEventListener('mousemove', updateBackground);
        document.removeEventListener('mouseleave', resetBackground);
      };
    },
    {
      scope: container,
      dependencies: [palette[50], mobile, md],
      revertOnUpdate: true,
    },
  );

  return (
    <div
      className='first contents whitespace-nowrap text-[16.6dvw] font-black leading-[0.8] md:text-[17.25dvw] lg:text-[11.73dvw]'
      ref={container}
    >
      {!mobile ? (
        <SplittedWord
          className={`relative z-[2] ml-[-0.05em] select-none ${styles.stroke}`}
          id='text'
        >
          {md ? 'FSARACHO' : 'FELIPESARACHO'}
        </SplittedWord>
      ) : (
        // Using simplified element in mobile
        <SplittedWord className='ml-[-0.05em] select-none font-black'>
          {md ? 'FSARACHO' : 'FELIPESARACHO'}
        </SplittedWord>
      )}
    </div>
  );
};

export default FooterText;
