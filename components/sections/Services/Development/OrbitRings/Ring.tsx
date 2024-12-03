import { FC, ReactNode } from 'react';
import styles from './ring.module.css';
import { cn } from '@/lib/utils';

const Ring: FC<{ children?: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  return (
    <div className={cn(styles['orbit-ring'], 'orbit-ring', className)}>
      {children}
    </div>
  );
};

export default Ring;
