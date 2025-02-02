import { forwardRef, HTMLAttributes } from 'react';

import { initialPalette } from '@/lib/theme';
import { cn } from '@/lib/utils';

const LoadingLines = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className = '', ...rest }, ref) => {
  const initialColorValues = Object.values(initialPalette.hex);

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 grid h-fit w-full grid-cols-9 items-center justify-center gap-[-1px]',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {initialColorValues.map((color, index) => {
        if (index === 0 || index > 9) return null;
        return (
          <div
            // Using 101% width to prevent visual bug when apply will change
            className='loading-line col-span-1 h-screen w-[101%] will-change-[transform,background]'
            style={{ backgroundColor: color }}
            key={`loading-line-${color}`}
          />
        );
      })}

      <h3
        className='absolute justify-self-center text-[4rem] font-bold text-white drop-shadow-lg md:text-[6rem]'
        id='loading-logo'
      >
        FSARACHO
      </h3>
    </div>
  );
});

LoadingLines.displayName = 'LoadingLinesContainer';

export default LoadingLines;
