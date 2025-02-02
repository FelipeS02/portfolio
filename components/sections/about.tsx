import { FC, memo } from 'react';
import Image from 'next/image';

import AboutImage from '@/public/assets/images/about-image.webp';

export const ABOUT_ELEMENTS_IDS = {
  WRAPPER: 'about-wrapper',
  OVERLAY: 'about-overlay',
  SECTION: 'about',
  'MOBILE-SECTION': 'about-mobile',
  CONTENT: 'about-content',
};

const advice =
  'after:absolute after:left-1 after:top-1 after:font-medium after:text-white after:opacity-40 after:content-["REFERENCIA"] relative';

const About: FC<{ mobile?: boolean }> = memo(function About({
  mobile = false,
}) {
  if (mobile)
    return (
      <section
        className={`grid h-screen w-full grid-rows-2 xl:hidden ${advice}`}
        id={ABOUT_ELEMENTS_IDS['MOBILE-SECTION']}
      >
        <Image
          src={AboutImage}
          alt='about-image'
          className='relative col-span-1 h-full select-none object-cover object-center'
          priority
        />
        <div className='col-span-1 flex flex-col items-start justify-center text-balance p-4'>
          <h1 className='text-[5rem] font-bold leading-[0.9] text-palette-600 dark:text-palette-500'>
            SOBRE <br /> MI.
          </h1>
          <p className='text-xl'>
            Soy Felipe, desarrollador Full-Stack especializado en Front-end
            actualmente viviendo en{' '}
            <span className='font-semibold'>
              Buenos Aires, <span className='text-[#75AADB]'>Arg</span>
              <span className='text-[#FCBF49]'>en</span>
              <span className='text-[#75AADB]'>tina</span>
            </span>
          </p>
        </div>
      </section>
    );

  return (
    <div
      className='after:text-md fixed inset-0 z-10 m-auto h-0 w-full after:absolute after:right-2 after:mt-2 after:tracking-widest after:text-foreground after:content-["(DESLIZAR)"] max-xl:hidden'
      id={ABOUT_ELEMENTS_IDS.WRAPPER}
    >
      <div className='relative size-full overflow-hidden bg-background'>
        <div
          className='absolute inset-0 z-10 size-full'
          id={ABOUT_ELEMENTS_IDS.OVERLAY}
        />
        <section
          className='absolute inset-0 top-0 flex size-full'
          id={ABOUT_ELEMENTS_IDS.SECTION}
        >
          <div className={`relative h-full grow ${advice} select-none`}>
            <Image
              src={AboutImage}
              alt='about-section-image'
              fill
              className='object-cover'
              priority
            />
          </div>
          <div
            className='flex flex-col items-center justify-center overflow-hidden text-balance md:items-start'
            id={ABOUT_ELEMENTS_IDS.CONTENT}
          >
            <div className='p-8'>
              <h1 className='static w-[5em] text-[8rem] font-bold leading-[0.9] text-palette-600 dark:text-palette-500'>
                SOBRE MI.
              </h1>
              <p className='min-w-[250px] text-xl'>
                Soy Felipe, desarrollador Full-Stack especializado en Front-end
                actualmente viviendo en{' '}
                <span className='font-semibold'>
                  Buenos Aires, <span className='text-[#75AADB]'>Arg</span>
                  <span className='text-[#FCBF49]'>en</span>
                  <span className='text-[#75AADB]'>tina</span>
                </span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
});

export default About;
