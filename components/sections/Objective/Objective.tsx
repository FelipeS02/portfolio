import { SplittedText } from '@/components/ui/SplittedText';
import ClockLines from './ClockLines';
import { memo } from 'react';

export const OBJECTIVE_ELEMENTS_IDS = {
  SECTION: 'objective',
  TEXT: 'objective-text',
};

const Objective = memo(function Objective() {
  return (
    <section
      id={OBJECTIVE_ELEMENTS_IDS.SECTION}
      className='my-12 gap-8 px-4 flex flex-col items-center w-full justify-between md:h-[60vh] md:my-28'
    >
      <ClockLines />
      <h3
        className='text-[3rem] md:text-[4rem] font-semibold w-full max-w-[1400px] text-balance leading-tight'
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
