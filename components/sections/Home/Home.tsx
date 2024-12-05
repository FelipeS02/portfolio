import { FC, memo, ReactNode } from 'react';
import Header from './Header/Header';
import HeroSection from './HeroSection';

export const HOME_ELEMENT_IDS = {
  SECTION: 'home',
};

const Home: FC<{ children: ReactNode }> = memo(function Home({
  children: aboutSection,
}) {
  return (
    <section
      className='flex flex-col h-screen w-full justify-between p-4 overflow-hidden relative'
      id={HOME_ELEMENT_IDS.SECTION}
    >
      <Header />
      {aboutSection}
      <HeroSection />
    </section>
  );
});

export default Home;
