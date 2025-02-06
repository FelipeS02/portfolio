import { FC, memo, ReactNode } from 'react';

import Header from '../header/header';
import HeroSection from './hero-section';

export const HOME_ELEMENT_IDS = {
  SECTION: 'home',
  OVERLAY: 'home-overlay',
};

const Home: FC<{ children: ReactNode }> = memo(function Home({
  children: aboutSection,
}) {
  return (
    <section
      className='relative flex h-screen w-full flex-col justify-between overflow-hidden p-4 max-md:h-[100svh]'
      id={HOME_ELEMENT_IDS.SECTION}
    >
      <Header />
      <div
        className='fixed left-0 top-0 z-50 hidden h-screen w-screen select-none'
        id={HOME_ELEMENT_IDS.OVERLAY}
      />
      {aboutSection}
      <HeroSection />
    </section>
  );
});

export default Home;
