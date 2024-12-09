import { DevelopmentList, DevelopmentListTitle } from '@/components/layout';
import Radar from './Radar';
import { ArrowButton, ListItem } from '@/components/ui';
import { BriefcaseBusiness } from 'lucide-react';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Henry, Lilab } from '@/components/ui/icons';

const ExperienceBadge: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className = '',
}) => (
  <div
    className={cn(
      'border-b border-palette-600/50 text-foreground py-1 text-left',
      className
    )}
  >
    <p className='text-lg'>{children}</p>
  </div>
);

const ExperienceInfo: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className='gap-2 lg:gap-6 flex justify-end flex-wrap'>{children}</div>;
};

const StyledLilabIcon = () => (
  <Lilab className='grayscale dark:invert size-40' />
);

const Experience = () => {
  return (
    <DevelopmentList className='py-14'>
      <DevelopmentListTitle className='flex gap-2 items-center'>
        <BriefcaseBusiness
          size={30}
          strokeWidth={1.5}
          className='text-palette-500'
        />
        Experiencia
      </DevelopmentListTitle>

      <p className='text-xl max-w-[800px] text-balance mb-5'>
        Con mas de dos años de experiencia laboral, he tenido el privilegio de
        contribuir en todas las etapas de la creación de aplicaciones web
        dinámicas y altamente interactivas.
      </p>

      <ul className='size-full'>
        <ListItem className='overflow-hidden relative justify-between'>
          <Radar className='absolute w-[40%] -translate-x-5 opacity-70 bg-background' />
          <div className='z-[2]'>
            <h6 className='text-2xl font-semibold tracking-wide'>
              En búsqueda de nuevos desafíos
            </h6>
            <p className='text-lg max-w-[450px] text-balance font-light'>
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
        </ListItem>
        <ListItem className='justify-between'>
          <StyledLilabIcon />
          <ExperienceInfo>
            <ExperienceBadge>
              Desarrollador Frontend ML. / Diseñador
            </ExperienceBadge>
            <ExperienceBadge>Dic. 2023 - Jun. 2024</ExperienceBadge>
          </ExperienceInfo>
        </ListItem>
        <ListItem className='justify-between'>
          <StyledLilabIcon />
          <ExperienceInfo>
            <ExperienceBadge>
              Desarrollador Frontend Jr. / Diseñador
            </ExperienceBadge>
            <ExperienceBadge>Nov. 2021 - Mar. 2023</ExperienceBadge>
          </ExperienceInfo>
        </ListItem>
        <ListItem className='justify-between'>
          <Henry className='size-56 grayscale dark:invert' />
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
