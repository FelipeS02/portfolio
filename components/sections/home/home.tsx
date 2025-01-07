import { FC, memo, ReactNode } from 'react';

import Header from './header/header';
import HeroSection from './hero-section';

export const HOME_ELEMENT_IDS = {
  SECTION: 'home',
};

const Home: FC<{ children: ReactNode }> = memo(function Home({
  children: aboutSection,
}) {
  return (
    <section
      className='relative flex h-screen w-full flex-col justify-between overflow-hidden p-4 transition-[height]'
      id={HOME_ELEMENT_IDS.SECTION}
    >
      <Header />
      {aboutSection}
      <HeroSection />
    </section>
  );
});

export default Home;
