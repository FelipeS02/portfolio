'use client';

import React, { RefObject, useLayoutEffect, useRef, useState } from 'react';

import { Slot } from '@radix-ui/react-slot';

export default function FullWidthText({
  children,
  container: containerRef,
}: {
  children: React.ReactNode;
  container: RefObject<HTMLElement>;
}) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(100);

  useLayoutEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const container = containerRef.current;
    const text = textRef.current;

    const resizeObserver = new ResizeObserver(() => adjustSize());
    resizeObserver.observe(container);

    function adjustSize() {
      const containerWidth = container.offsetWidth;
      if (!containerWidth) return;

      let low = 5;
      let high = 500;
      let best = low;

      // Búsqueda binaria para optimizar al máximo
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        text.style.fontSize = mid + 'px';
        const textWidth = text.scrollWidth;

        if (textWidth <= containerWidth) {
          best = mid;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }

      setFontSize(best);
    }

    adjustSize();
    return () => resizeObserver.disconnect();
  }, [children, containerRef]);

  return (
    <Slot ref={textRef} style={{ fontSize }} className='whitespace-nowrap'>
      {children}
    </Slot>
  );
}
