import { FC, memo, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, LucideProps } from 'lucide-react';
import styles from './ring.module.css';

export const RingItem = ({
  Icon,
  position = 'left',
  className = '',
  iconClassName = '',
  ...iconProps
}: {
  position?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  iconClassName?: string;
  Icon: LucideIcon;
} & LucideProps) => {
  const stylesByPosition: Record<typeof position, string> = {
    right: 'top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-gradient-to-r',
    left: 'top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-l',
    bottom: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-gradient-to-b',
    top: 'top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-t',
  };

  return (
    <div
      className={cn(
        'p-3 from-palette-800 to-palette-900 border border-palette-800 absolute rounded-full aspect-square flex items-center justify-center',
        stylesByPosition[position],
        className
      )}
    >
      <Icon
        size={24}
        strokeWidth={0.25}
        className={cn(
          'size-full text-palette-100 fill-palette-100',
          iconClassName
        )}
        absoluteStrokeWidth
        {...iconProps}
      />
    </div>
  );
};

const Ring: FC<{ children?: ReactNode; className?: string }> = memo(
  function Ring({ children, className = '' }) {
    return (
      <div
        className={cn(
          styles['orbit-ring'],
          'orbit-ring relative inset-0',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

export default Ring;
