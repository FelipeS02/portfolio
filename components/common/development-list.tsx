import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const DevelopmentListTitle: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  ...rest
}) => {
  return (
    <h5
      className={cn(
        'font-archivo [&_svg]:text-palette-500 flex gap-1 text-2xl uppercase lg:text-3xl [&_*]:leading-7.5 [&_svg]:size-7.5 [&_svg]:stroke-[1.5px]',
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
