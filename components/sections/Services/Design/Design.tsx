import { cn } from '@/lib/utils';
import FigmaToolbar from './FigmaToolbar/FigmaToolbar';
import FiguresBoard from './FiguresBoard/FiguresBoard';

const horizontalLines =
  'max-md:after:-left-6 after:min-h-full after:w-screen after:outline-foreground-secondary after:outline after:outline-1 after:absolute after:-left-20 ';

const verticalLines =
  'before:min-w-full before:h-screen before:outline-foreground-secondary before:outline-1 before:outline before:absolute';

const LineDot = ({ className = '' }: { className?: string }) => (
  <div
    className={cn(
      'size-[13px] rounded-full bg-foreground absolute z-20',
      className
    )}
  />
);

const Design = () => {
  return (
    <section
      id='design'
      className='max-md:p-6 max-w-full overflow-hidden h-screen p-20 flex relative'
    >
      <div
        className={cn(
          'size-full relative flex items-center justify-center cuadriculado',
          horizontalLines,
          verticalLines
        )}
        id='design-section-board'
      >
        <LineDot className='-left-[0.450rem] -top-[0.450rem]' />
        <LineDot className='-right-[0.450rem] -top-[0.450rem]' />
        <LineDot className='-left-[0.450rem] -bottom-[0.450rem]' />
        <LineDot className='-right-[0.450rem] -bottom-[0.450rem]' />
        <FiguresBoard />
      </div>
      <div className='max-md:-ml-6 absolute w-full -ml-20 flex items-center justify-center bottom-4'>
        <FigmaToolbar className='max-md:scale-75' />
      </div>
    </section>
  );
};

export default Design;
