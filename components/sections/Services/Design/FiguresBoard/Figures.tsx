import { FC, forwardRef } from 'react';
import SelectableElement from './SelectableElement';

interface FiguresProps {
  selectedElement?: string;
}

interface FigureProps extends FiguresProps {
  id: string;
}

export const Figure: FC<FigureProps> = ({ id, selectedElement }) => (
  <SelectableElement
    className='max-md:h-[10%] h-[20%] aspect-square absolute figure-container flex justify-center items-center'
    selected={id === selectedElement}
    id={id}
  >
    <div className='size-full bg-transparent transition-colors figure' />
  </SelectableElement>
);

const Figures = forwardRef<HTMLDivElement, FiguresProps>(function Figures(
  { selectedElement },
  ref
) {
  return (
    <div ref={ref} className='contents'>
      <Figure id='figure-1' selectedElement={selectedElement} />
      <Figure id='figure-2' selectedElement={selectedElement} />
      <Figure id='figure-3' selectedElement={selectedElement} />
      <Figure id='figure-4' selectedElement={selectedElement} />
      <Figure id='figure-5' selectedElement={selectedElement} />
      <Figure id='figure-6' selectedElement={selectedElement} />
      <Figure id='figure-7' selectedElement={selectedElement} />
      <Figure id='figure-8' selectedElement={selectedElement} />
      <Figure id='figure-9' selectedElement={selectedElement} />
      <Figure id='figure-10' selectedElement={selectedElement} />
    </div>
  );
});

export default Figures;
