import { FC, PropsWithChildren, ReactNode } from 'react';

import { BriefcaseBusiness } from 'lucide-react';

import { ArrowButton } from '@/components/ui/arrow-button';
import {
  DevelopmentList,
  DevelopmentListTitle,
} from '@/components/ui/development_list';
import { Henry, Lilab } from '@/components/ui/icons';
import { ListItem } from '@/components/ui/list-item';

import { cn } from '@/lib/utils';

import Radar from './radar';

const ExperienceBadge: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => (
  <div
    className={cn(
      'border-b border-palette-600/50 py-1 text-left text-palette-50',
      className,
    )}
  >
    <p className='text-lg'>{children}</p>
  </div>
);

const ExperienceInfo: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='flex flex-wrap gap-2 lg:gap-6'>{children}</div>;
};

const StyledLilabIcon = () => (
  <Lilab className='w-40 -translate-x-[5%] grayscale invert' />
);

const Experience = () => {
  return (
    <DevelopmentList className='py-14'>
      <DevelopmentListTitle className='flex items-center gap-2'>
        <BriefcaseBusiness
          size={30}
          strokeWidth={1.5}
          className='text-palette-500'
        />
        Experiencia
      </DevelopmentListTitle>

      <p className='mb-5 max-w-[800px] text-balance text-xl'>
        Con mas de dos años de experiencia laboral, he tenido el privilegio de
        contribuir en todas las etapas de la creación de aplicaciones web
        dinámicas y altamente interactivas.
      </p>

      <ul className='size-full'>
        <ListItem className='relative flex-wrap justify-between overflow-hidden'>
          <div>
            <h6 className='text-2xl font-semibold tracking-wide'>
              En búsqueda de nuevos desafíos
            </h6>
            <p className='max-w-[450px] text-balance text-lg font-light'>
              Si creés que mi perfil se alinea con los principios de tu empresa:
            </p>
          </div>

          <ArrowButton
            as='a'
            href='https://www.linkedin.com/in/felipe-saracho/'
            target='_blank'
            className='border-palette-600/50 transition-colors hover:border-palette-600'
          >
            Contactame ahora
          </ArrowButton>
          <Radar className='absolute z-[-1] w-full opacity-70 max-md:place-self-center md:w-[40%] md:-translate-x-5' />
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <StyledLilabIcon />
          <ExperienceInfo>
            <ExperienceBadge>
              Desarrollador Frontend ML. / Diseñador
            </ExperienceBadge>
            <ExperienceBadge>Dic. 2023 - Jun. 2024</ExperienceBadge>
          </ExperienceInfo>
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <StyledLilabIcon />
          <ExperienceInfo>
            <ExperienceBadge>
              Desarrollador Frontend Jr. / Diseñador
            </ExperienceBadge>
            <ExperienceBadge>Nov. 2021 - Mar. 2023</ExperienceBadge>
          </ExperienceInfo>
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <Henry className='w-56 grayscale invert' />
          <ExperienceInfo>
            <ExperienceBadge>
              Bootcamp / Practica Profesional Full-Stack
            </ExperienceBadge>
            <ExperienceBadge>Jun. 2021 - Oct. 2021</ExperienceBadge>
          </ExperienceInfo>
        </ListItem>
      </ul>
    </DevelopmentList>
  );
};

export default Experience;
