import AnimationsProvider from '@/components/providers/animations';
import About from '@/components/sections/about';
import Home from '@/components/sections/home/home';
import Objective from '@/components/sections/objective/objective';
import Design from '@/components/sections/services/design/design';
import Development from '@/components/sections/services/development/development';

export default function Page() {
  return (
    <AnimationsProvider>
      <main className='block size-full'>
        <Home>
          <About />
        </Home>

        <About mobile />

        <Objective />

        <Design />

        <Development />

      </main>
    </AnimationsProvider>
  );
}
