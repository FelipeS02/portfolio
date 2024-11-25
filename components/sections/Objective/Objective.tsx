import { SplittedText } from '@/components/ui/SplittedText';
import ClockLines from './ClockLines';

export const OBJECTIVE_ELEMENTS_IDS = {
  SECTION: 'objective',
  TEXT: 'objective-text',
};

const Objective = () => {
  return (
    <section
      id={OBJECTIVE_ELEMENTS_IDS.SECTION}
      className='flex flex-col items-center w-full justify-between h-[60vh] my-28'
    >
      <ClockLines />
      <h3
        className='text-[3rem] md:text-[4rem] font-semibold w-full max-w-[1400px] text-balance leading-tight mx-8'
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
};

export default Objective;
