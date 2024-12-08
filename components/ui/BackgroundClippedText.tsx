import { cn } from '@/lib/utils';
import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

type BackgroundClippedTextProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className' | 'children'>;

const BackgroundClippedText = <T extends ElementType = 'span'>({
  as,
  className = '',
  children,
  ...props
}: BackgroundClippedTextProps<T>) => {
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
