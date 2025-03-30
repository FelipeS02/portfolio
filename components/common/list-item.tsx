import { PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const ListItem = ({
  children,
  className = '',
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <li
      className={cn(
        'flex min-h-52 items-center text-pretty border-b-2 border-palette-600 font-neue first:border-t-2 last:border-b-0',
        className,
      )}
    >
      {children}
    </li>
  );
};

export { ListItem };
