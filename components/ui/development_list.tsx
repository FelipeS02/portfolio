import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const DevelopmentListTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <h5
      className={cn('font-archivo text-2xl font-medium lg:text-3xl', className)}
      {...rest}
    />
  );
};

const DevelopmentList: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <div
      className={cn(
        'relative flex min-h-screen w-full flex-col gap-3 px-4 lg:px-14',
        className,
      )}
      {...rest}
    />
  );
};

export { DevelopmentList, DevelopmentListTitle };
