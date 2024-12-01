import { forwardRef } from 'react';

export const Figure = () => (
  <div className='max-md:h-[10%] h-[20%] aspect-square overflow-hidden absolute figure-container flex justify-center items-center'>
    <div className='size-full bg-transparent transition-colors figure' />
  </div>
);

const Figures = forwardRef<HTMLDivElement>(function Figures(_, ref) {
  return (
    <div ref={ref} className='contents'>
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
      <Figure />
    </div>
  );
});

export default Figures;
