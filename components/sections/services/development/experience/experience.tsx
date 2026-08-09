import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Earth } from 'lucide-react';

import {
  DevelopmentList,
  DevelopmentListTitle,
} from '@/components/common/development-list';
import { Henry } from '@/components/common/icons';
import ItRock from '@/components/common/icons/itrock';
import { ListItem } from '@/components/common/list-item';

import { AVAILABLE } from '@/lib/env';

import {
  DevelopmentExperienceAvailable,
  DevelopmentExperienceBadge,
  DevelopmentExperienceInfo,
  DevelopmentExperienceLilabIcon,
} from './experience-section-parts';

const Experience = async () => {
  const t = await getTranslations('Experience');

  return (
    <DevelopmentList className='py-14' id='experience'>
      <div className='mb-2 space-y-1'>
        <DevelopmentListTitle>
          <Earth />
          <span>{t('title')}</span>
        </DevelopmentListTitle>

        <p className='max-w-[750px] font-light text-balance uppercase'>
          {t('paragraph')}
        </p>
      </div>

      <ul className='size-full'>
        {AVAILABLE ? <DevelopmentExperienceAvailable /> : null}

        <ListItem className='flex-wrap justify-between'>
          <Link href='https://www.itrock.com.ar/' target='_blank'>
            <ItRock className='h-auto w-full max-w-40' />
          </Link>
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              {t('itrock.role')}
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              {t('itrock.date')}
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>

        <ListItem className='flex-wrap justify-between'>
          <DevelopmentExperienceLilabIcon />
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              {t('lilabMl.role')}
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              {t('lilabMl.date')}
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>
        <ListItem className='flex-wrap justify-between'>
          <DevelopmentExperienceLilabIcon />
          <DevelopmentExperienceInfo>
            <DevelopmentExperienceBadge>
              {t('lilabJr.role')}
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              {t('lilabJr.date')}
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
              {t('henry.role')}
            </DevelopmentExperienceBadge>
            <DevelopmentExperienceBadge>
              {t('henry.date')}
            </DevelopmentExperienceBadge>
          </DevelopmentExperienceInfo>
        </ListItem>
      </ul>
    </DevelopmentList>
  );
};

export default Experience;
