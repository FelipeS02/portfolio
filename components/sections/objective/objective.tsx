import { memo } from 'react';

import { SplittedText } from '@/components/ui/splitted-text';

import ClockLines from './clock_lines';

export const OBJECTIVE_ELEMENTS_IDS = {
  SECTION: 'objective',
  TEXT: 'objective-text',
};

const Objective = memo(function Objective() {
  return (
    <section
      id={OBJECTIVE_ELEMENTS_IDS.SECTION}
      className='flex h-screen w-full flex-col items-center justify-between gap-8 px-4 max-md:mb-[13vh] lg:mt-[-70vh]'
    >
      <div className='clock-lines z-0 w-full'>
        <ClockLines />
      </div>
      <h3
        className='w-full max-w-[1400px] text-balance text-[2.5rem] font-semibold leading-tight md:text-[3rem] lg:text-[4rem]'
        id={OBJECTIVE_ELEMENTS_IDS.TEXT}
      >
        <SplittedText className='mb-[-0.1em] pb-[0.1em]'>
          Mi objetivo es crear productos que no solo sigan las tendencias
          actuales, sino que también sean atemporales y perduren en el tiempo.
        </SplittedText>
      </h3>
      <div className='clock-lines z-0 w-full'>
        <ClockLines side='bottom' />
      </div>
    </section>
  );
});

export default Objective;
