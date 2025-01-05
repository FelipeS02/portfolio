import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const DevelopmentListTitle: FC<PropsWithChildren<{ className?: string }>> = ({
  className = '',
  children,
}) => {
  return (
    <h5
      className={cn('font-archivo text-2xl font-medium lg:text-3xl', className)}
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
        'relative flex min-h-screen w-full flex-col gap-3 px-4 lg:px-14',
        className,
      )}
    >
      {children}
    </div>
  );
};

export { DevelopmentList, DevelopmentListTitle };
