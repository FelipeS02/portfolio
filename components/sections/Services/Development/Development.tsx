import NodeJs from '@/components/ui/icons/NodeJS';
import Ring, { RingItem } from './OrbitRings/Ring';
import Globe from './Globe';
import NestJS from '@/components/ui/icons/NestJS';
import ReactJS from '@/components/ui/icons/ReactJs';
import TailwindCSS from '@/components/ui/icons/TailwindCSS';
import Typescript from '@/components/ui/icons/Typescript';
import MySQL from '@/components/ui/icons/MySQL';
import Html5 from '@/components/ui/icons/Html5';
import Css from '@/components/ui/icons/Css';
import Gsap from '@/components/ui/icons/Gsap';
import CSharp from '@/components/ui/icons/CSharp';

export const DEVELOPMENT = {
  SECTION: 'development-section',
};

const Development = () => {
  return (
    <section
      className='h-screen w-full max-h-screen flex flex-col items-center justify-end overflow-hidden relative'
      id={DEVELOPMENT.SECTION}
    >
      <div
        className='flex items-center justify-center size-full absolute'
        id='planet-orbit'
      >
        <div
          className='flex h-full md:w-full md:h-fit aspect-square absolute'
          id='rings-container'
        >
          <Ring>
            <Ring>
              <RingItem
                Icon={NodeJs}
                position='top'
                className='size-[4.5rem] lg:size-[6.5rem]'
              />
              <RingItem
                Icon={NestJS}
                position='left'
                className='size-[4.5rem] lg:size-[6.5rem]'
              />
              <RingItem
                Icon={Gsap}
                position='bottom'
                className='size-[4.5rem] lg:size-[6.5rem]'
                viewBox='0 0 82 30'
              />
              <Ring>
                <RingItem
                  Icon={ReactJS}
                  position='left'
                  className='size-[4rem] lg:size-24'
                />
                <RingItem
                  Icon={MySQL}
                  position='right'
                  className='size-[4rem] lg:size-24'
                />
                <RingItem
                  Icon={CSharp}
                  position='bottom'
                  className='size-[4rem] lg:size-24 p-4'
                  viewBox='0 0 256 288'
                />
                <Ring>
                  <Ring>
                    <RingItem
                      Icon={Typescript}
                      position='bottom'
                      className='size-14 lg:size-[5.5rem] p-4'
                    />
                    <RingItem
                      Icon={Css}
                      position='top'
                      className='size-14 lg:size-[5.5rem]'
                      viewBox='0 0 1000 1000'
                    />
                    <Ring>
                      <RingItem
                        Icon={TailwindCSS}
                        position='right'
                        className='size-12 lg:size-20'
                      />
                      <RingItem
                        Icon={Html5}
                        position='left'
                        className='size-12 lg:size-20'
                      />
                      <Ring />
                    </Ring>
                  </Ring>
                </Ring>
              </Ring>
            </Ring>
          </Ring>
        </div>
        <Globe className='absolute inset-0 place-self-center max-w-full shadow-globe overflow-hidden' />
      </div>
      <div className='w-full p-8 pb-20 z-10 border-t-2 bg-background/50 border-palette-500 backdrop-blur-sm flex flex-col gap-3'>
        <h4 className='text-5xl md:text-6xl font-semibold after:contents-["-"] after:border-4 after:border-palette-500 after:ml-4 after:animate-blink'>
          <span className='text-palette-600'>{'<'}</span> Desarrollo Web{' '}
          <span className='text-palette-600'>{'/>'}</span>
        </h4>
        <p className='text-2xl max-w-[25%] tracking-wider'>
          Elaboracion a medida de aplicaciones web utilizando las ultimas
          tecnologias.
        </p>
      </div>
    </section>
  );
};

export default Development;
