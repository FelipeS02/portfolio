import About from '@/components/sections/About/About';
import Home from '@/components/sections/Home/Home';
import Objective from '@/components/sections/Objective/Objective';
import Design from '@/components/sections/Services/Design/Design';
import ServicesTransition from '@/components/sections/Services/Transition';

export default function Page() {
  return (
    <main className='size-full block' id='#main'>
      <Home>
        <About />
      </Home>
      <About mobile />
      <Objective />

      <Design />
    </main>
  );
}
