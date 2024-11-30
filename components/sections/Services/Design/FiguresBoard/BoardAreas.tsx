"use client";

import { Breakpoint } from '@/hooks/useBreakPoints';
import { memo } from 'react';

const BoardAreas = memo(function GridAreas({
  breakpoint,
}: {
  breakpoint: Breakpoint;
}) {
  const rowsByBreakPoint: Record<Breakpoint, string[]> = {
    sm: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    md: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    lg: ['a', 'b', 'c', 'd', 'e'],
    xl: ['a', 'b', 'c', 'd', 'e'],
  };

  const columnsByBreakPoint: Record<Breakpoint, number> = {
    sm: 4,
    md: 7,
    lg: 7,
    xl: 11,
  };

  const columns = Array.from({ length: columnsByBreakPoint[breakpoint] });

  return (
    <div className='contents'>
      {rowsByBreakPoint[breakpoint].map((row) => (
        <div className='flex w-fit grow row' key={`row-${row}`}>
          {columns.map((_, index) => {
            const column = index + 1;
            const area = row + column;

            return (
              <div
                className='h-full aspect-square area relative flex items-center justify-center border'
                id={`area-${area}`}
                key={`area-${area}`}
              >
                <span className='absolute'>{area}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});

export default BoardAreas;
