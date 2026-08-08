import { getTranslations } from 'next-intl/server';

import { SplittedText } from '@/components/common/splitted-text';

import ClockLines from './clock_lines';
import ProjectsTrack, { PROJECTS_TRACK_ID } from './projects-track';

export const OBJECTIVE_ELEMENTS_IDS = {
  SECTION: 'objective',
  STAGE: 'objective-stage',
  TEXT: 'objective-text',
  TEXT_SLOT: 'objective-text-slot',
  TRACK: PROJECTS_TRACK_ID,
};

const Objective = async function Objective() {
  const t = await getTranslations('Objective');

  return (
    <section
      id={OBJECTIVE_ELEMENTS_IDS.SECTION}
      className='relative flex w-full flex-col items-center justify-between gap-8 overflow-hidden px-4 max-md:mb-[10vh] md:h-screen lg:mt-[-70vh]'
    >
      <ClockLines />

      <div
        id={OBJECTIVE_ELEMENTS_IDS.STAGE}
        className='relative flex w-full flex-1 flex-col items-center justify-center'
      >
        {/* Invisible corner target the heading flies into on desktop */}
        <div
          id={OBJECTIVE_ELEMENTS_IDS.TEXT_SLOT}
          className='pointer-events-none invisible absolute top-0 left-0 w-[min(46vw,640px)] max-md:hidden'
          aria-hidden
        />

        <h3
          className='w-full max-w-[1400px] text-[2rem] leading-tight font-semibold text-pretty uppercase max-sm:text-justify md:text-[2.5rem] lg:text-[3rem]'
          id={OBJECTIVE_ELEMENTS_IDS.TEXT}
          data-nosnippet
        >
          <SplittedText>{t('heading')}</SplittedText>
        </h3>

        <ProjectsTrack />
      </div>

      <ClockLines side='bottom' className='max-md:hidden'/>
    </section>
  );
};

export default Objective;
