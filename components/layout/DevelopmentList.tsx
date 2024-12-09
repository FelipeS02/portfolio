import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

const DevelopmentListTitle: FC<PropsWithChildren<{ className?: string }>> = ({
  className = '',
  children,
}) => {
  return (
    <h5
      className={cn('text-2xl lg:text-3xl font-medium font-archivo', className)}
    >
      {children}
    </h5>
  );
};

const DevelopmentList: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'min-h-screen flex flex-col gap-3 px-4 lg:px-14 w-full relative',
        className
      )}
    >
      {children}
    </div>
  );
};

export { DevelopmentList, DevelopmentListTitle };
