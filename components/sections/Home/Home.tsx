import BackgroundClippedText from '@/components/ui/BackgroundClippedText';
import HeroPhotoCredits from './HeroPhotoCredits';
import Header from './Header/Header';

const HeroSection = () => {
  return (
    <div className='flex flex-col select-none w-fit gap-1'>
      <div className='flex items-center text-palette-600'>
        <h4 className='text-xl'>
          Desarrollador <b className='font-semibold'>Full-Stack</b>
        </h4>
      </div>
      <HeroPhotoCredits>
        <BackgroundClippedText
          as='h1'
          className='font-bold flex flex-col text-[13rem] leading-[0.8] -ml-3 drop-shadow-hero text-left'
        >
          <span>FELIPE</span>
          <span>SARACHO</span>
        </BackgroundClippedText>
      </HeroPhotoCredits>
    </div>
  );
};

const Home = () => {
  return (
    <section className='flex flex-col justify-between w-full p-4'>
      <Header />
      <HeroSection />
    </section>
  );
};

export default Home;
