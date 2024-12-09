import { cn } from '@/lib/utils';
import { PropsWithChildren } from 'react';

const ListItem = ({
  children,
  className = '',
}: PropsWithChildren<{
  className?: string;
}>) => {
  return (
    <li
      className={cn(
        'border-b-2 first:border-t-2 last:border-b-0 border-palette-600 h-52 font-neue text-pretty flex items-center',
        className
      )}
    >
      {children}
    </li>
  );
};

export { ListItem };
