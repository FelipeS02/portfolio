import { cn } from '@/lib/utils';
import ComposedComponent from '@/models/composedComponent';
import React, { ElementType } from 'react';

const BackgroundClippedText = <T extends ElementType = 'span'>({
  as,
  className = '',
  children,
  ...props
}: ComposedComponent<T>) => {
  const Component = as ?? 'span';

  return (
    <Component
      className={cn(
        'bg-cover bg-theme bg-clip-text bg-center text-transparent',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { BackgroundClippedText };
