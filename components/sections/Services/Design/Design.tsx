import { cn } from '@/lib/utils';
import FigmaToolbar from './FigmaToolbar/FigmaToolbar';
import FiguresBoard from './FiguresBoard';

const horizontalLines =
  'max-md:after:-left-6 after:min-h-full after:w-screen after:border-foreground-secondary after:border-y after:absolute after:-left-20';

const verticalLines =
  'before:min-w-full before:h-screen before:border-foreground-secondary before:border-x before:absolute before:-top-20';

const LineDot = ({ className = '' }: { className?: string }) => (
  <div
    className={cn('size-[13px] rounded-full bg-foreground absolute z-20', className)}
  />
);

const TextSquare = ({ className = '' }: { className?: string }) => (
  <div
    className={cn('absolute size-3 bg-white border border-inherit', className)}
  />
);

const SectionText = () => (
  <div className='max-md:items-center flex flex-col gap-2 p-6 absolute z-20'>
    <div className='max-md:w-full relative px-1 border-2 border-[#0C8CE9] w-fit'>
      <TextSquare className='-top-2 -left-2' />
      <TextSquare className='-top-2 -right-2' />
      <TextSquare className='-bottom-2 -left-2' />
      <TextSquare className='-bottom-2 -right-2' />
      <h4 className='text-5xl md:text-8xl font-semibold'>Diseño web</h4>
    </div>
    <p className='text-xl tracking-wider md:max-w-[480px] font-medium text-foreground-secondary'>
      Creación de diseños visualmente impresionantes y centrados en el usuario
      que capturan la identidad y los valores de la marca.
    </p>
  </div>
);

const Design = () => {
  return (
    <section
      id='design'
      className='max-md:px-6 max-w-full overflow-hidden h-screen p-20 flex relative'
    >
      <div
        className={cn(
          'size-full relative flex items-center justify-center cuadriculado',
          horizontalLines,
          verticalLines
        )}
      >
        <LineDot className='-left-1.5 -top-1.5' />
        <LineDot className='-right-1.5 -top-1.5' />
        <LineDot className='-left-1.5 -bottom-1.5' />
        <LineDot className='-right-1.5 -bottom-1.5' />
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
