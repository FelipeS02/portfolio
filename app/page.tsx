import About from '@/components/sections/About/About';
import Home from '@/components/sections/Home/Home';

export default function Page() {
  return (
    <main className='size-full block' id='#main'>
      <Home>
        <About />
      </Home>
      <About mobile />
    </main>
  );
}
