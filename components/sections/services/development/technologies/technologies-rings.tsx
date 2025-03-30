import { memo } from 'react';

import * as Icons from '@/components/common/icons';

import Globe from './globe';
import Ring, { RingItem } from './orbit_rings/ring';

const TechnologiesRings = memo(function TechnologiesRings() {
  return (
    <div
      className='sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden'
      id='planet-orbit'
    >
      <div
        className='absolute flex aspect-square h-full will-change-[transform,opacity] lg:h-fit lg:w-full [&>.orbit-ring]:will-change-transform'
        id='rings-container'
      >
        <Ring>
          <Ring>
            <RingItem
              Icon={Icons.NodeJs}
              position='top'
              className='size-16 lg:size-[6.5rem]'
            />
            <RingItem
              Icon={Icons.NestJS}
              position='left'
              className='size-16 lg:size-[6.5rem]'
            />
            <RingItem
              Icon={Icons.Gsap}
              position='bottom'
              className='size-16 lg:size-[6.5rem]'
              viewBox='0 0 82 30'
            />
            <Ring>
              <RingItem
                Icon={Icons.ReactJS}
                position='left'
                className='size-14 lg:size-24'
              />
              <RingItem
                Icon={Icons.MySQL}
                position='right'
                className='size-14 lg:size-24'
              />
              <RingItem
                Icon={Icons.CSharp}
                position='bottom'
                className='size-14 p-4 lg:size-24'
                viewBox='0 0 256 288'
              />
              <Ring>
                <Ring>
                  <RingItem
                    Icon={Icons.Typescript}
                    position='bottom'
                    className='size-12 p-4 lg:size-[5.5rem]'
                  />
                  <RingItem
                    Icon={Icons.Css}
                    position='top'
                    className='size-12 p-5 lg:size-[5.5rem]'
                    viewBox='0 0 1000 1000'
                  />
                  <Ring>
                    <RingItem
                      Icon={Icons.TailwindCSS}
                      position='right'
                      className='size-10 lg:size-20'
                    />
                    <RingItem
                      Icon={Icons.Html5}
                      position='left'
                      className='size-10 lg:size-20'
                    />
                    <Ring>
                      <Ring>
                        <Ring>
                          <Ring>
                            <Ring>
                              <Ring />
                            </Ring>
                          </Ring>
                        </Ring>
                      </Ring>
                    </Ring>
                  </Ring>
                </Ring>
              </Ring>
            </Ring>
          </Ring>
        </Ring>
      </div>
      <Globe className='shadow-globe absolute m-auto max-w-full place-self-center overflow-hidden will-change-transform' />
    </div>
  );
});

export default TechnologiesRings;
