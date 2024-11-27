import Image from 'next/image';
import { FC } from 'react';
import AboutImage from '@/public/images/about_image.webp';

export const ABOUT_ELEMENTS_IDS = {
  WRAPPER: 'about-wrapper',
  OVERLAY: 'about-overlay',
  SECTION: 'about-section',
  TEXT: 'about-text',
};

const About: FC<{ mobile?: boolean }> = ({ mobile = false }) => {
  if (mobile)
    return (
      <section
        className='grid grid-rows-2 w-full h-screen md:hidden'
        id='about'
      >
        <Image
          src={AboutImage}
          alt='about-image'
          className='col-span-1 object-center object-cover h-full'
        />
        <div className='items-start col-span-1 flex flex-col justify-center p-4 text-balance'>
          <h1 className='text-[5rem] font-bold leading-[0.9]'>
            SOBRE <br /> MI.
          </h1>
          <p className='text-xl tracking-wider font-medium'>
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
      className='max-md:hidden fixed w-full z-10 h-0 inset-0 m-auto after:content-["(DESLIZAR)"] after:text-md after:text-foreground after:tracking-wider after:right-0 after:absolute after:mt-2'
      id={ABOUT_ELEMENTS_IDS.WRAPPER}
    >
      <div className='size-full relative overflow-hidden bg-background '>
        <div
          className='absolute size-full inset-0 z-10'
          id={ABOUT_ELEMENTS_IDS.OVERLAY}
        />
        <section
          className='flex size-full inset-0 top-0 absolute'
          id={ABOUT_ELEMENTS_IDS.SECTION}
        >
          <div className='h-full relative grow'>
            <Image
              src={AboutImage}
              alt='about-section-image'
              fill
              className='object-cover'
            />
          </div>
          <div
            className='items-center flex flex-col justify-center text-balance md:items-start overflow-hidden'
            id={ABOUT_ELEMENTS_IDS.TEXT}
          >
            <div className='p-8'>
              <h1 className='w-[5em] text-[8rem] font-bold leading-[0.9] static'>
                SOBRE MI.
              </h1>
              <p className='min-w-[250px] text-xl font-medium tracking-wider text-foreground-secondary'>
                Soy Felipe, desarrollador Full-Stack especializado en Front-end
                actualmente viviendo en{' '}
                <span className='font-semibold text-foreground'>
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
};

export default About;
