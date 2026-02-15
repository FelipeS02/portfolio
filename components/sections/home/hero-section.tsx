import { SplittedWord } from '@/components/common/splitted-text';

const HeroSection = () => {
  return (
    <div className='hero-container flex w-full flex-col gap-1 select-none'>
      <h4 className='text-md after:contents-["-"] after:animate-blink after:border-palette-700 after:dark:border-palette-600 after:ml-2 after:h-4 after:border lg:text-xl'>
        Desarrollador <b className='font-semibold'>Full-Stack</b>
      </h4>

      <h1
        className='text-palette-600 dark:text-palette-500 relative -ml-[0.05em] flex w-fit flex-col text-left text-[18vw] leading-[0.8] font-bold drop-shadow transition-[font-size] lg:text-[10vw] dark:drop-shadow-none'
        letter-slide-up='true'
      >
        <SplittedWord>FELIPE</SplittedWord>
        <SplittedWord>SARACHO</SplittedWord>
      </h1>
    </div>
  );
};

export default HeroSection;
