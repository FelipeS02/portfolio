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
      className='my-12 flex w-full flex-col items-center justify-between gap-8 px-4 md:my-28 md:h-[60vh]'
    >
      <ClockLines />
      <h3
        className='w-full max-w-[1400px] text-balance text-[3rem] font-semibold leading-tight md:text-[4rem]'
        id={OBJECTIVE_ELEMENTS_IDS.TEXT}
      >
        <SplittedText>
          Mi objetivo es crear productos que no solo sigan las tendencias
          actuales, sino que también sean atemporales y perduren en el tiempo.
        </SplittedText>
      </h3>
      <ClockLines side='bottom' />
    </section>
  );
});

export default Objective;
