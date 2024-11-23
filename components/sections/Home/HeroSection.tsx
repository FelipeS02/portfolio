import SplittedText from '@/components/ui/SplittedText';
import BackgroundClippedText from '@/components/ui/BackgroundClippedText';
import HeroPhotoCredits from './HeroPhotoCredits';
import { memo } from 'react';

const HeroSection = memo(function HeroSection() {
  return (
    <div className='flex flex-col select-none w-fit gap-1 hero-container'>
      <h4 className='text-md lg:text-xl after:contents-["-"] after:border after:h-4 after:border-palette-800 after:ml-2 after:animate-blink'>
        Desarrollador <b className='font-semibold'>Full-Stack</b>
      </h4>

      <HeroPhotoCredits>
        <BackgroundClippedText
          as='h1'
          className='font-bold flex flex-col text-[18vw] lg:text-[10vw] leading-[0.8] -ml-[0.05em] drop-shadow-hero text-left relative hero-text transition-[font-size]'
        >
          <SplittedText word='FELIPE' />
          <SplittedText word='SARACHO' />
        </BackgroundClippedText>
      </HeroPhotoCredits>
    </div>
  );
});

export default HeroSection;
