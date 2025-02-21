import { cn } from '@/lib/utils';

import ObjectiveDivider from '../../objective/objective-divider';
import FigmaToolbar from './figma-toolbar/toolbar';
import FiguresBoard from './figures-board/board';

const horizontalLines =
  'max-md:after:-left-6 after:min-h-full after:w-screen after:outline-neutral-300 after:dark:outline-neutral-500 after:outline after:outline-1 after:absolute after:-left-20 ';

const verticalLines =
  'before:min-w-full before:h-screen before:outline-neutral-300 before:dark:outline-neutral-500 before:outline-1 before:outline before:absolute';

const LineDot = ({ className = '' }: { className?: string }) => (
  <div
    className={cn(
      'absolute z-20 size-2 rounded-full bg-neutral-300 dark:bg-neutral-500',
      className,
    )}
  />
);

export const DESIGN_ELEMENTS_IDS = {
  WRAPPER: 'design-wrapper',
  SECTION: 'design',
  BOARD: 'design-board',
  HERO: 'design-section-hero',
};

const Design = () => {
  return (
    <div id={DESIGN_ELEMENTS_IDS.WRAPPER}>
      <ObjectiveDivider />
      <section
        className='relative flex h-screen max-w-full overflow-hidden bg-background p-20 max-md:p-6'
        id={DESIGN_ELEMENTS_IDS.SECTION}
      >
        <div
          className={cn(
            'bg-grid relative flex size-full items-center justify-center',
            horizontalLines,
            verticalLines,
          )}
          id={DESIGN_ELEMENTS_IDS.BOARD}
        >
          <LineDot className='-left-[0.250rem] -top-[0.250rem]' />
          <LineDot className='-right-[0.250rem] -top-[0.250rem]' />
          <LineDot className='-bottom-[0.250rem] -left-[0.250rem]' />
          <LineDot className='-bottom-[0.250rem] -right-[0.250rem]' />
          <FiguresBoard />
        </div>
        <div className='absolute bottom-4 z-10 -ml-20 flex w-full items-center justify-center max-md:-ml-6'>
          <FigmaToolbar className='max-md:scale-75' />
        </div>
      </section>
    </div>
  );
};

export default Design;
