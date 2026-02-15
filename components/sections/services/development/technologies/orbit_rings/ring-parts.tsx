import { LucideIcon, LucideProps } from 'lucide-react';

import { cn } from '@/lib/utils';

export const RingItem = ({
  Icon,
  position = 'left',
  className = '',
  iconClassName = '',
  iconKey,
  ...iconProps
}: {
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  iconClassName?: string;
  Icon: LucideIcon;
  iconKey: string;
} & LucideProps) => {
  const stylesByPosition: Record<typeof position, string> = {
    right: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r',
    left: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-l',
    bottom:
      'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gradient-to-b',
    top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t',
  };

  return (
    <div
      className={cn(
        'border-palette-800 from-palette-800 to-palette-900 absolute flex aspect-square items-center justify-center rounded-full border p-3',
        stylesByPosition[position],
        className,
      )}
      key={`${iconKey}-container`}
    >
      <Icon
        size={24}
        strokeWidth={0.25}
        key={iconKey}
        className={cn(
          'fill-palette-100 text-palette-100 size-full',
          iconClassName,
        )}
        absoluteStrokeWidth
        {...iconProps}
      />
    </div>
  );
};

export const RingsCircleGradient = () => (
  <svg width='0' height='0' className='absolute'>
    <defs>
      <linearGradient id='ring-gradient'>
        <stop offset='25%' stopColor='hsl(var(--palette-500) / 0.35)' />
        <stop offset='40%' stopColor='hsl(var(--palette-600) / 0.7)' />
        <stop offset='50%' stopColor='hsl(var(--palette-700))' />
      </linearGradient>
    </defs>
  </svg>
);
