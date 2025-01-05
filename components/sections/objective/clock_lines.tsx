import { FC } from 'react';
import Marquee from 'react-fast-marquee';

import { cn } from '@/lib/utils';

const LineIterations: FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='182'
    height='30'
    viewBox='0 0 182 30'
    fill='none'
    className={className}
  >
    <line
      x1='1.25'
      y1='5.46392e-08'
      x2='1.25'
      y2='25'
      stroke='inherit'
      strokeWidth='2.5'
    />
    <line
      x1='20.75'
      y1='3.27835e-08'
      x2='20.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='40.75'
      y1='3.27835e-08'
      x2='40.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='60.75'
      y1='3.27835e-08'
      x2='60.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='80.75'
      y1='3.27835e-08'
      x2='80.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='100.75'
      y1='3.27835e-08'
      x2='100.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='120.75'
      y1='3.27835e-08'
      x2='120.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='140.75'
      y1='3.27835e-08'
      x2='140.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='160.75'
      y1='3.27835e-08'
      x2='160.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
    <line
      x1='180.75'
      y1='3.27835e-08'
      x2='180.75'
      y2='20'
      stroke='inherit'
      strokeWidth='1.5'
    />
  </svg>
);

const ClockLines: FC<{ side?: 'top' | 'bottom'; id?: string }> = ({
  side = 'top',
}) => {
  return (
    <Marquee
      autoFill
      className='z-0 w-full'
      direction={side === 'bottom' ? 'right' : 'left'}
      speed={20}
      gradient
      gradientColor='hsl(var(--background))'
    >
      <LineIterations
        className={cn(
          'stroke-foreground-secondary',
          side === 'bottom' ? 'mr-4 rotate-180' : 'ml-4',
        )}
      />
    </Marquee>
  );
};

export default ClockLines;
