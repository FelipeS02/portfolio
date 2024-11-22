import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import SplittedText from '@/components/ui/SplittedText';
import BackgroundClippedText from '@/components/ui/BackgroundClippedText';
import HeroPhotoCredits from './HeroPhotoCredits';

gsap.registerPlugin(useGSAP);

const HeroSection = () => {
  useGSAP(() => {
    gsap.set('.char', {
      yPercent: 100,
      position: 'static',
      opacity: 0,
      willChange: 'transform',
    });

    gsap.delayedCall(2, () => {
      gsap.to('.char', {
        yPercent: 0,
        duration: 1.2,
        delay: 0.55,
        ease: 'circ.inOut',
        stagger: 0.08,
        opacity: 1,
      });
    });
  }, []);

  return (
    <div className='flex flex-col select-none w-fit gap-1 hero-container'>
      <div className='flex items-center text-palette-600 hero-subtitle'>
        <h4 className='text-md lg:text-xl after:contents-["-"] after:border after:h-4 after:border-palette-300 after:ml-2 after:animate-blink'>
          Desarrollador <b className='font-semibold'>Full-Stack</b>
        </h4>
      </div>
      <HeroPhotoCredits>
        <div>
          <BackgroundClippedText
            as='h1'
            className='font-bold hidden md:flex flex-col text-[13rem] leading-[0.8] -ml-3 drop-shadow-hero text-left relative'
            id='hero-text'
          >
            <SplittedText word='FELIPE' />
            <SplittedText word='SARACHO' />
          </BackgroundClippedText>
          <BackgroundClippedText className='font-bold flex flex-col md:hidden text-[18vw] leading-[0.8] drop-shadow-hero text-left -ml-2'>
            <span>FELIPE</span>
            <span>SARACHO</span>
          </BackgroundClippedText>
        </div>
      </HeroPhotoCredits>
    </div>
  );
};

export default HeroSection;
