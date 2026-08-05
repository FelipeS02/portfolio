import { getTranslations } from 'next-intl/server';

import { SplittedText } from '@/components/common/splitted-text';

import ClockLines from './clock_lines';

export const OBJECTIVE_ELEMENTS_IDS = {
  SECTION: 'objective',
  TEXT: 'objective-text',
};

const Objective = async function Objective() {
  const t = await getTranslations('Objective');

  return (
    <section
      id={OBJECTIVE_ELEMENTS_IDS.SECTION}
      className='flex h-screen w-full flex-col items-center justify-between gap-8 px-4 max-md:mb-[13vh] lg:mt-[-70vh]'
    >
      <div className='clock-lines z-0 w-full'>
        <ClockLines />
      </div>
      <h3
        className='w-full max-w-[1400px] text-[2rem] leading-tight font-semibold text-pretty uppercase max-sm:text-justify md:text-[2.5rem] lg:text-[3rem]'
        id={OBJECTIVE_ELEMENTS_IDS.TEXT}
        data-nosnippet
      >
        <SplittedText>{t('heading')}</SplittedText>
      </h3>
      <div className='clock-lines z-0 w-full'>
        <ClockLines side='bottom' />
      </div>
    </section>
  );
};

export default Objective;
