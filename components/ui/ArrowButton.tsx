import { cn } from '@/lib/utils';
import ComposedComponent from '@/models/composedComponent';
import { ArrowUpRight } from 'lucide-react';
import { ElementType } from 'react';

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
        'border-palette-500 border-b group pb-1 flex items-center gap-1',
        className
      )}
      {...props}
    >
      <div className='text-lg font-archivo tracking-wide'>{children}</div>
      <ArrowUpRight className='group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform' />
    </Component>
  );
};

export { ArrowButton };
