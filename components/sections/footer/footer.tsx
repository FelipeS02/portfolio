import { FC, HTMLAttributes } from 'react';

import { ArrowButton } from '@/components/ui/arrow-button';

import { cn } from '@/lib/utils';

import FooterText from './text';

const Footer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = '',
  id = 'footer',
  ...rest
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'flex h-[60vh] flex-col items-center justify-between overflow-hidden bg-[#111111] text-palette-50',
        className,
      )}
      id={id}
      {...rest}
    >
      <div className='flex w-full flex-wrap items-start justify-between px-4 py-3'>
        <h6 className='text-xl'>
          ©{currentYear} <span className='font-semibold'>FSARACHO.</span>
        </h6>

        <div className='inline-flex flex-col gap-4' id='socials'>
          <ArrowButton
            as='a'
            href='https://www.linkedin.com/in/felipe-saracho/'
            target='_blank'
          >
            Linkedin
          </ArrowButton>
          <ArrowButton
            as='a'
            href='https://www.linkedin.com/in/felipe-saracho/'
            target='_blank'
          >
            Github
          </ArrowButton>
        </div>
      </div>

      <FooterText />
    </footer>
  );
};

export default Footer;
