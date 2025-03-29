import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const DevelopmentListTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <h5
      className={cn(
        '[&_svg]:size-7.5 [&_*]:leading-7.5 font-archivo text-2xl lg:text-3xl [&_svg]:stroke-[1.5px] [&_svg]:text-palette-500 uppercase',
        className,
      )}
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
