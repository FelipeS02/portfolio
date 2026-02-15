import Experience from './experience/experience';
import TechnologiesList from './technologies/technologies-list';
import TechnologiesRings from './technologies/technologies-rings';

export const DEVELOPMENT_ELEMENTS_IDS = {
  SECTION: 'development-section',
  CONTENT: 'development-section-info',
  HERO: 'development-section-hero',
};

const Development = () => {
  // Using random hero text
  const texts = [
    <>
      <span className='text-palette-600 lg:ml-[-0.78em]'>{'<'}</span> Desarrollo
      Web <span className='text-palette-600'>{'/>'}</span>
    </>,

    <span className='-ml-[0.05em]' key='development-section-2'>
      Desarrollo.Web{' '}
      <span className='text-palette-600 tracking-widest'>()</span>
    </span>,
  ];

  return (
    <section
      className='size-screen bg-palette-950 relative'
      id={DEVELOPMENT_ELEMENTS_IDS.SECTION}
    >
      <TechnologiesRings />

      <div
        id={DEVELOPMENT_ELEMENTS_IDS.CONTENT}
        className='text-palette-50 relative z-10 backdrop-blur-[2px]'
      >
        <div
          className='border-palette-600 relative flex w-full items-center justify-between border-t-2 px-4 pt-8 pb-12 lg:px-14 lg:pt-10 lg:pb-20'
          id={DEVELOPMENT_ELEMENTS_IDS.HERO}
        >
          <div className='flex flex-col gap-1.5'>
            <h4 className='after:contents-["-"] after:animate-blink after:border-palette-600 text-4xl font-semibold normal-case after:ml-1 after:border-2 md:text-6xl md:after:ml-4 md:after:border-2'>
              {texts[Math.floor(Math.random() * texts.length)]}
            </h4>

            <p className='max-w-[500px] text-lg text-balance uppercase'>
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
