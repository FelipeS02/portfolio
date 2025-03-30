import { HTMLAttributes } from 'react';
import Link from 'next/link';

import { ArrowButton } from '@/components/common/arrow-button';
import { Lilab } from '@/components/common/icons';
import { ListItem } from '@/components/common/list-item';

import { cn } from '@/lib/utils';

import ExperienceSectionRadar from './experience-section-radar';

export const DevelopmentExperienceBadge = ({
  children,
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'border-palette-600/50 text-palette-50 border-b py-1 text-left',
      className,
    )}
    {...rest}
  >
    <span className='font-archivo text-lg'>{children}</span>
  </div>
);

export const DevelopmentExperienceInfo = ({
  className = '',
  ...rest
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('flex flex-wrap gap-4 lg:gap-6', className)} {...rest} />
  );
};

export const DevelopmentExperienceLilabIcon = () => (
  <Link
    href='https://www.lilab.io/'
    target='_blank'
    className='opacity-40 transition-opacity hover:opacity-100'
  >
    <Lilab className='w-40 -translate-x-[5%] grayscale invert' />
  </Link>
);

export const DevelopmentExperienceAvailable = () => {
  return (
    <ListItem className='relative flex-wrap justify-between overflow-hidden'>
      <div>
        <h6 className='text-xl font-semibold tracking-wide'>
          En búsqueda de nuevos desafíos
        </h6>
        <p className='text-palette-50/70 max-w-[400px] font-light text-balance'>
          Si creés que mi perfil se alinea con los principios de tu empresa:
        </p>
      </div>

      <ArrowButton
        as='a'
        href='https://www.linkedin.com/in/felipe-saracho/'
        target='_blank'
        className='border-palette-600/50 hover:border-palette-600 transition-colors'
      >
        Contactame ahora
      </ArrowButton>
      <ExperienceSectionRadar className='absolute z-[-1] w-full opacity-70 max-md:place-self-center md:w-[40%] md:-translate-x-5' />
    </ListItem>
  );
};
