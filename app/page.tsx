import AnimationsProvider from '@/components/providers/animations';
import About from '@/components/sections/about';
import Footer from '@/components/sections/footer/footer';
import Home from '@/components/sections/home/home';
import Objective from '@/components/sections/objective/objective';
import Design from '@/components/sections/services/design/design';
import Development from '@/components/sections/services/development/development';

export default function Page() {
  return (
    <main className='block size-full'>
      <AnimationsProvider>
        <Home>
          <About />
        </Home>

        <About mobile />

        <Objective />

        <Design />

        <Development />

        <Footer />
      </AnimationsProvider>
    </main>
  );
}
