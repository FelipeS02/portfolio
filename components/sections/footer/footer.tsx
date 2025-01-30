import { ComponentProps, FC } from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

import FooterText from './text';

const FooterLink: FC<ComponentProps<typeof Link>> = ({
  className,
  ...rest
}) => {
  return (
    <Link
      className={cn('font-archivo text-xl font-medium', className)}
      {...rest}
    />
  );
};

const Footer = () => {
  return (
    <footer className='flex h-[70vh] flex-col justify-between bg-[#111111] text-palette-50'>
      <div className='flex items-center justify-between px-2 py-3'>
        <div className='inline-flex gap-2' id='socials'>
          <FooterLink
            href='https://www.linkedin.com/in/felipe-saracho/'
            target='_blank'
          >
            LinkedIn
          </FooterLink>
          <FooterLink href='https://github.com/FelipeS02' target='_blank'>
            GitHub
          </FooterLink>
        </div>

        <h6>
          ©2025 <span className='font-semibold'>FSARACHO.</span>
        </h6>
      </div>

      <FooterText />
    </footer>
  );
};

export default Footer;
