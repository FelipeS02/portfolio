'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

const ObjectiveDivider = () => {
  return (
    <Marquee
      className='objective-divider w-full bg-palette-700 py-1 font-archivo text-[3.5rem] font-medium text-palette-100 md:py-3 dark:bg-palette-500 [&_*]:mx-2'
      speed={20}
      autoFill
    >
      <span>SERVICIOS</span>
      <span>✺</span>
    </Marquee>
  );
};

export default ObjectiveDivider;
