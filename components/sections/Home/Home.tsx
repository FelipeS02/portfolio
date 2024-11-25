import { FC, memo, ReactNode } from 'react';
import Header from './Header/Header';
import HeroSection from './HeroSection';

const Home: FC<{ children: ReactNode }> = memo(function Home({
  children: aboutSection,
}) {
  return (
    <section
      className='flex flex-col h-screen w-full justify-between p-4 overflow-hidden relative'
      id='home'
    >
      <Header />
      {aboutSection}
      <HeroSection />
    </section>
  );
});

export default Home;
