import { memo } from 'react';

import { SplittedWord } from '@/components/ui/splitted-text';

const HeroSection = memo(function HeroSection() {
  return (
    <div className='hero-container flex w-full select-none flex-col gap-1'>
      <h4 className='text-md after:contents-["-"] after:ml-2 after:h-4 after:animate-blink after:border after:border-palette-800 lg:text-xl'>
        Desarrollador <b className='font-semibold'>Full-Stack</b>
      </h4>

      <h1
        className='relative -ml-[0.05em] flex w-fit flex-col text-left text-[18vw] font-bold leading-[0.8] text-palette-600 drop-shadow transition-[font-size] lg:text-[10vw] dark:text-palette-500 dark:drop-shadow-none'
        letter-slide-up='true'
      >
        <SplittedWord>FELIPE</SplittedWord>
        <SplittedWord>SARACHO</SplittedWord>
      </h1>
    </div>
  );
});

export default HeroSection;
