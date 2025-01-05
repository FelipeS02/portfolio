import { Fragment } from 'react';

import Experience from './experience/experience';
import TechnologiesList from './technologies/technologies_list';
import TechnologiesRings from './technologies/technologies_rings';

export const DEVELOPMENT_ELEMENTS_IDS = {
  SECTION: 'development-section',
  CONTENT: 'development-section-info',
  HERO: 'development-section-hero',
};

const Development = () => {
  // Using random hero text
  const texts = [
    <Fragment key='development-section-1'>
      <span className='-ml-[0.78em] text-palette-600'>{'<'}</span> Desarrollo
      Web <span className='text-palette-600'>{'/>'}</span>
    </Fragment>,
    <span className='-ml-[0.05em]' key='development-section-2'>
      Desarrollo.Web{' '}
      <span className='tracking-widest text-palette-600'>()</span>
    </span>,
  ];

  return (
    <section
      className='size-screen relative bg-palette-950'
      id={DEVELOPMENT_ELEMENTS_IDS.SECTION}
    >
      <TechnologiesRings />

      <div id={DEVELOPMENT_ELEMENTS_IDS.CONTENT} className='relative z-10'>
        <div
          className='relative flex w-full items-center justify-between border-t-2 border-palette-600 px-4 pb-12 pt-8 lg:px-14 lg:pb-20 lg:pt-10'
          id={DEVELOPMENT_ELEMENTS_IDS.HERO}
        >
          <div className='flex flex-col gap-3'>
            <h4 className='after:contents-["-"] text-3xl font-semibold after:ml-1 after:animate-blink after:border-2 after:border-palette-600 md:text-6xl md:after:ml-4 md:after:border-4'>
              {texts[Math.floor(Math.random() * texts.length)]}
            </h4>

            <p className='max-w-[500px] text-balance text-xl'>
              Elaboracion a medida de aplicaciones web utilizando las ultimas
              tecnologias.
            </p>
          </div>
        </div>

        <TechnologiesList />

        <Experience />
      </div>
    </section>
  );
};

export default Development;
