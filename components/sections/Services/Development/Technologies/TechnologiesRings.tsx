import * as Icons from '@/components/ui/icons';
import Ring, { RingItem } from './OrbitRings/Ring';
import Globe from './Globe';
import { memo } from 'react';

const TechnologiesRings = memo(function TechnologiesRings() {
  return (
    <div
      className='flex items-center justify-center h-screen w-full sticky -mb-[100vh] top-0 overflow-hidden'
      id='planet-orbit'
    >
      <div
        className='flex h-full md:w-full md:h-fit aspect-square absolute animate-orbit-rings'
        id='rings-container'
      >
        <Ring>
          <Ring>
            <RingItem
              Icon={Icons.NodeJs}
              position='top'
              className='size-[4.5rem] lg:size-[6.5rem]'
            />
            <RingItem
              Icon={Icons.NestJS}
              position='left'
              className='size-[4.5rem] lg:size-[6.5rem]'
            />
            <RingItem
              Icon={Icons.Gsap}
              position='bottom'
              className='size-[4.5rem] lg:size-[6.5rem]'
              viewBox='0 0 82 30'
            />
            <Ring>
              <RingItem
                Icon={Icons.ReactJS}
                position='left'
                className='size-[4rem] lg:size-24'
              />
              <RingItem
                Icon={Icons.MySQL}
                position='right'
                className='size-[4rem] lg:size-24'
              />
              <RingItem
                Icon={Icons.CSharp}
                position='bottom'
                className='size-[4rem] lg:size-24 p-4'
                viewBox='0 0 256 288'
              />
              <Ring>
                <Ring>
                  <RingItem
                    Icon={Icons.Typescript}
                    position='bottom'
                    className='size-14 lg:size-[5.5rem] p-4'
                  />
                  <RingItem
                    Icon={Icons.Css}
                    position='top'
                    className='size-14 lg:size-[5.5rem] p-5'
                    viewBox='0 0 1000 1000'
                  />
                  <Ring>
                    <RingItem
                      Icon={Icons.TailwindCSS}
                      position='right'
                      className='size-12 lg:size-20'
                    />
                    <RingItem
                      Icon={Icons.Html5}
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
      <Globe className='absolute m-auto place-self-center max-w-full dark:shadow-globe-dark shadow-globe-light overflow-hidden' />
    </div>
  );
});

export default TechnologiesRings;
