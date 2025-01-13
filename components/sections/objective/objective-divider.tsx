'use client';

import React from 'react';
import Marquee from 'react-fast-marquee';

const ObjectiveDivider = () => {
  return (
    <Marquee
      className='objective-divider w-full bg-palette-500 font-archivo text-[3.5rem] font-medium [&_*]:mx-2 py-1 md:py-3'
      speed={20}
      autoFill
    >
      <span>SERVICIOS</span>
      <span>✺</span>
    </Marquee>
  );
};

export default ObjectiveDivider;
