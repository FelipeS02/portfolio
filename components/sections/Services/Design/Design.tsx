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

export const SelectZoneSquare = ({
  className = '',
}: {
  className?: string;
}) => (
  <div
    className={cn(
      'absolute size-3 bg-white border border-inherit group-data-[clicked=false]/design-text:opacity-0',
      className
    )}
  />
);

const SectionText = () => (
  <div
    className='max-md:items-center flex flex-col relative gap-2 p-4 z-20 group/design-text data-[clicked=true]:border-2 border-[#0C8CE9]'
    id='design-section-draggable'
    data-clicked={false}
  >
    <SelectZoneSquare className='-top-2 -left-2' />
    <SelectZoneSquare className='-top-2 -right-2' />
    <SelectZoneSquare className='-bottom-2 -left-2' />
    <SelectZoneSquare className='-bottom-2 -right-2' />

    <h4 className='text-5xl md:text-8xl font-semibold'>Diseño web</h4>
    <p className='text-xl tracking-wider md:max-w-[480px] font-medium text-foreground'>
      Creación de diseños visualmente impresionantes y centrados en el usuario
      que capturan la identidad y los valores de la marca.
    </p>
  </div>
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
        <SectionText />
        <FiguresBoard />
      </div>
      <div className='max-md:-ml-6 absolute w-full -ml-20 flex items-center justify-center bottom-4'>
        <FigmaToolbar className='max-md:scale-75' />
      </div>
    </section>
  );
};

export default Design;
