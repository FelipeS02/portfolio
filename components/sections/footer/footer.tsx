import { FC, HTMLAttributes } from 'react';

import { ArrowButton } from '@/components/common/arrow-button';

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
        'text-palette-50 flex h-[60vh] flex-col items-end justify-between overflow-hidden bg-[#111111] px-4',
        className,
      )}
      id={id}
      {...rest}
    >
      <div className='inline-flex w-fit gap-4 py-3' id='socials'>
        <ArrowButton
          as='a'
          href='https://www.linkedin.com/in/felipe-saracho/'
          target='_blank'
        >
          Linkedin
        </ArrowButton>
        <ArrowButton as='a' href='https://github.com/FelipeS02' target='_blank'>
          Github
        </ArrowButton>
      </div>

      <div className='flex w-full flex-col'>
        <span className='mb-0.5 text-base font-medium md:text-lg'>
          ©{currentYear}
        </span>
        <FooterText />
      </div>
    </footer>
  );
};

export default Footer;
