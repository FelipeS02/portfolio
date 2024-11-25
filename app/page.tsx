import About from '@/components/sections/About/About';
import Home from '@/components/sections/Home/Home';
import Objective from '@/components/sections/Objective/Objective';

export default function Page() {
  return (
    <main className='size-full block' id='#main'>
      <Home>
        <About />
      </Home>
      <About mobile />
      <Objective />
    </main>
  );
}
