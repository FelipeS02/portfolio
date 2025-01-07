import { ElementType } from 'react';

import { ArrowUpRight } from 'lucide-react';

import { cn } from '@/lib/utils';
import ComposedComponent from '@/models/composed-component';

const ArrowButton = <T extends ElementType = 'button'>({
  as,
  className = '',
  children,
  ...props
}: ComposedComponent<T>) => {
  const Component = as ?? 'button';

  return (
    <Component
      className={cn(
        'group flex items-center gap-1 border-b border-palette-500 pb-1',
        className,
      )}
      {...props}
    >
      <div className='font-archivo text-lg tracking-wide'>{children}</div>
      <ArrowUpRight className='transition-transform group-hover:-translate-y-1 group-hover:translate-x-1' />
    </Component>
  );
};

export { ArrowButton };
