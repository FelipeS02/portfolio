import { SplittedWord, BackgroundClippedText } from '@/components/ui';
import HeroPhotoCredits from './HeroPhotoCredits';
import { memo } from 'react';

const HeroSection = memo(function HeroSection() {
  return (
    <div className='flex flex-col select-none gap-1 hero-container w-full'>
      <h4 className='text-md lg:text-xl after:contents-["-"] after:border after:h-4 after:border-palette-800 after:ml-2 after:animate-blink'>
        Desarrollador <b className='font-semibold'>Full-Stack</b>
      </h4>

      <HeroPhotoCredits>
        <BackgroundClippedText
          as='h1'
          className='font-bold flex flex-col text-[18vw] lg:text-[10vw] leading-[0.8] w-fit -ml-[0.05em] text-left relative transition-[font-size]'
          letter-slide-up='true'
        >
          <SplittedWord>FELIPE</SplittedWord>
          <SplittedWord>SARACHO</SplittedWord>
        </BackgroundClippedText>
      </HeroPhotoCredits>
    </div>
  );
});

export default HeroSection;
