'use client';

import { useRef } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import { SplittedWord } from '@/components/ui/splitted-text';

import { useTheme } from '@/hooks/theme';

import styles from './text.module.css';

const FooterText = () => {
  const {
    palette: { hsl: palette },
  } = useTheme();

  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const letters = gsap.utils.toArray<HTMLSpanElement>('.char');

      document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;

        letters.forEach((letter) => {
          const rect = letter.getBoundingClientRect();
          const letterX = rect.left + rect.width / 2; // Centro de la letra
          const distance = Math.abs(mouseX - letterX); // Distancia del cursor

          // Definir el rango de efecto (puedes ajustarlo según tu diseño)
          const maxDistance = 250;
          const intensity = Math.max(0, 1 - distance / maxDistance); // Cuanto más cerca, más brillante

          // Aplicar color según la intensidad
          gsap.to(letter, {
            color:
              intensity > 0
                ? `hsl(${palette[50]}, ${intensity * 100}%)`
                : 'hsl(0, 0%, 7%)',
            duration: 0.3,
            ease: intensity > 0 ? 'power2.out' : 'back.out',
          });
        });
      });
    },
    { scope: container, dependencies: [palette[50]], revertOnUpdate: true },
  );

  return (
    <div ref={container}>
      <SplittedWord
        className={`text-stroke-3 select-none text-[11.8vw] font-black leading-none max-md:hidden ${styles.stroke}`}
        id='text'
      >
        FELIPESARACHO
      </SplittedWord>

      <span
        className='select-none text-[18vw] font-black leading-none md:hidden'
        aria-hidden='true'
      >
        FSARACHO
      </span>
    </div>
  );
};

export default FooterText;
