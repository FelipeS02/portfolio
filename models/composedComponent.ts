import { ComponentPropsWithoutRef, ElementType } from 'react';

type ComposedComponent<T extends ElementType> = {
  as?: T;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export default ComposedComponent;
