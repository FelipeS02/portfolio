declare module 'react-fitty' {
  import React from 'react';
  /**
   * Snugly resizes text to fit its parent container width
   */
  export const ReactFitty: React.ForwardRefExoticComponent<
    React.HTMLAttributes<HTMLDivElement> & {
      children?: React.ReactNode;
      minSize?: number | undefined;
      maxSize?: number | undefined;
      wrapText?: boolean | undefined;
    } & React.RefAttributes<HTMLElement>
  >;
}
