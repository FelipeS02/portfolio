import Image from 'next/image';
import Link from 'next/link';

import { Earth } from 'lucide-react';

import {
  DevelopmentList,
  DevelopmentListTitle,
} from '@/components/common/development-list';
import { Henry } from '@/components/common/icons';
import { ListItem } from '@/components/common/list-item';
import ItRockLogo from '@/public/assets/images/it-rock.webp';

import {
  DevelopmentExperienceAvailable,
  DevelopmentExperienceBadge,
  DevelopmentExperienceInfo,
  DevelopmentExperienceLilabIcon,
} from './experience-section-parts';

const Experience = () => {
  return (
    <DevelopmentList className='py-14' id='experience'>
      <div className='mb-2 space-y-1'>
        <DevelopmentListTitle>
          <Earth />
          <span>Experiencia</span>
        </DevelopmentListTitle>

        <p className='max-w-[750px] font-light text-balance uppercase'>
          Con mas de tres años de experiencia laboral, tuve el privilegio de
          contribuir en todas las etapas de la creación de aplicaciones web
          dinámicas y altamente interactivas.
        </p>
      </div>

      <ul className='size-full'>
        {process.env.NEXT_PUBLIC_AVAILABLE === 'true' ? (
          <DevelopmentExperienceAvailable />
        ) : null}

        <ListItem className='flex-wrap justify-between'>
          <Link href='https://www.itrock.com.ar/' target='_blank'>
            <Image
              src={ItRockLogo}
              alt='ITROCK logo'
              className='h-auto max-w-40'
              width={160}
            />
          </Link>
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              Desarrollador Frontend SSR.
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>Mar. 2025</DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>

        <ListItem className='flex-wrap justify-between'>
          <DevelopmentExperienceLilabIcon />
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              Desarrollador Frontend ML. / Diseñador
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              Dic. 2023 - Jun. 2024
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <DevelopmentExperienceLilabIcon />
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              Desarrollador Frontend JR. / Diseñador
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              Nov. 2021 - Mar. 2023
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <Link
            href='https://www.soyhenry.com/'
            target='_blank'
            className='opacity-40 transition-opacity hover:opacity-100'
          >
            <Henry className='w-56 grayscale invert' />
          </Link>
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              Bootcamp / Practica Profesional Full-Stack
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              Jun. 2021 - Oct. 2021
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>
      </ul>
    </DevelopmentList>
  );
};

export default Experience;
