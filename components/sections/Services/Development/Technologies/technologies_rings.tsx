import { memo } from 'react';

import * as Icons from '@/components/ui/icons';

import Globe from './globe';
import Ring, { RingItem } from './orbit_rings/ring';

const TechnologiesRings = memo(function TechnologiesRings() {
  return (
    <div
      className='sticky top-0 -mb-[100vh] flex h-screen w-full items-center justify-center overflow-hidden'
      id='planet-orbit'
    >
      <div
        className='absolute flex aspect-square h-full animate-orbit-rings md:h-fit md:w-full'
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
                className='size-[4rem] p-4 lg:size-24'
                viewBox='0 0 256 288'
              />
              <Ring>
                <Ring>
                  <RingItem
                    Icon={Icons.Typescript}
                    position='bottom'
                    className='size-14 p-4 lg:size-[5.5rem]'
                  />
                  <RingItem
                    Icon={Icons.Css}
                    position='top'
                    className='size-14 p-5 lg:size-[5.5rem]'
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
      <Globe className='absolute m-auto max-w-full place-self-center overflow-hidden shadow-globe-light dark:shadow-globe-dark' />
    </div>
  );
});

export default TechnologiesRings;
