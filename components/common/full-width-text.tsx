'use client';

import React, { useEffectEvent, useLayoutEffect, useRef } from 'react';
import { ReactFitty } from 'react-fitty';

import { Slot } from '@radix-ui/react-slot';

// export default function FullWidthText({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   // const textRef = useRef<HTMLParagraphElement>(null);

//   // const fitTextToContainer = useEffectEvent(() => {
//   //   const element = textRef.current;
//   //   const parent = element?.parentElement;

//   //   if (!element || !parent) return;

//   //   const parentWidth = parent?.clientWidth;
//   //   // restablece transform para medición limpia
//   //   element.style.transform = 'scaleX(1)';
//   //   const textWidth = element.scrollWidth;

//   //   const scale = parentWidth / textWidth;
//   //   console.log(scale);

//   //   if (scale > 1) {
//   //     element.style.transform = `scale(${scale})`;
//   //   } else {
//   //     element.style.transform = 'scale(1)';
//   //   }
//   // });

//   // useLayoutEffect(() => {
//   //   window.addEventListener('resize', fitTextToContainer);

//   //   fitTextToContainer();

//   //   return () => {
//   //     window.removeEventListener('resize', fitTextToContainer);
//   //   };
//   // }, [children]);

//   return <ReactFitty>{children}</ReactFitty>;
// }

export default ReactFitty;
