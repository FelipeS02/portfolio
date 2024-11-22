'use client';

import Header from './Header/Header';
import HeroSection from './HeroSection';

const Home = () => {
  return (
    <section
      className='flex flex-col size-full justify-between w-full p-4'
      id='home'
    >
      <Header />
      <HeroSection />
    </section>
  );
};

export default Home;
