import { Fragment } from 'react';
import TechnologiesRings from './Technologies/TechnologiesRings';
import TechnologiesBanner from './Technologies/TechnologiesBanner';
import Globe from './Technologies/Globe';

export const DEVELOPMENT = {
  SECTION: 'development-section',
};

const Development = () => {
  // Using random hero text
  const texts = [
    <Fragment key='development-section-1'>
      <span className='text-palette-600 -ml-[0.8em]'>{'<'}</span> Desarrollo Web{' '}
      <span className='text-palette-600'>{'/>'}</span>
    </Fragment>,
    <span className='-ml-[0.05em]' key='development-section-2'>
      Desarrollo.Web{' '}
      <span className='text-palette-600 tracking-widest'>()</span>
    </span>,
  ];

  return (
    <section
      className='h-screen w-full max-h-screen flex flex-col items-center justify-end overflow-hidden relative will-change-transform duration-1000'
      id={DEVELOPMENT.SECTION}
    >
      <div className='w-full px-4 pt-8 pb-12 lg:px-14 lg:pt-10 lg:pb-20 z-10 border-t-2 bg-background/50 border-palette-500 flex justify-between items-center '>
        <div className='flex flex-col gap-3'>
          <h4 className='text-3xl md:text-6xl font-semibold after:ml-1 after:border-2 after:contents-["-"] md:after:border-4 after:border-palette-600 md:after:ml-4 after:animate-blink'>
            {texts[Math.floor(Math.random() * texts.length)]}
          </h4>

          <p className='text-xl max-w-[500px] text-balance'>
            Elaboracion a medida de aplicaciones web utilizando las ultimas
            tecnologias.
          </p>
          <TechnologiesBanner />
        </div>
      </div>
      <TechnologiesRings />
    </section>
  );
};

export default Development;
