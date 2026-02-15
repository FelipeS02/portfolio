'use client';

import { FC, ReactNode } from 'react';

import { useEngine } from '@/components/providers/engine';

import { cn } from '@/lib/utils';

import styles from './ring.module.css';

const Ring: FC<{
  children?: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const engine = useEngine();

  // Render masked div in safari to prevent engine overload
  if (engine === 'webkit' || engine === 'unknown') {
    return (
      <div
        className={cn(
          styles['orbit-ring'],
          'orbit-ring relative inset-0 before:inset-0',
          className,
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'orbit-ring pointer-events-none relative flex aspect-square w-full rounded-full',
        className,
      )}
    >
      <svg viewBox='0 0 100 100' className='absolute inset-0 h-full w-full'>
        <circle
          cx='50'
          cy='50'
          r='49.5'
          fill='none'
          stroke='url(#ring-gradient)'
          strokeWidth='0.15'
        />
      </svg>

      {children}
    </div>
  );
};

export default Ring;
