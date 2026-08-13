'use client';

import { useLocale, useTranslations } from 'next-intl';

import { ChevronDown, Earth } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useLocaleTransition } from '@/components/providers/locale-transition';

import { cn } from '@/lib/utils';

import { Locale, routing } from '@/i18n/routing';

const LOCALE_LABEL_KEYS: Record<Locale, string> = {
  es: 'spanish',
  en: 'english',
};

const LanguageSwitch = () => {
  const locale = useLocale();
  const t = useTranslations('LanguageSwitch');
  const { switching, switchLocale } = useLocaleTransition();

  return (
    <Popover>
      <PopoverTrigger
        className='text-foreground flex items-center gap-1 font-semibold'
        aria-label={t('label')}
      >
        <Earth className='size-5' /> {locale.toUpperCase()}
        <ChevronDown size={14} />
      </PopoverTrigger>
      <PopoverContent align='end' className='flex w-fit flex-col gap-1 p-1 shadow-none'>
        {routing.locales.map((localeOption) => (
          <button
            key={localeOption}
            className={cn(
              'hover:bg-foreground/10 px-2 py-1 text-left text-sm',
              localeOption === locale && 'font-semibold',
            )}
            disabled={switching || localeOption === locale}
            onClick={() => switchLocale(localeOption)}
          >
            {t(LOCALE_LABEL_KEYS[localeOption])}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitch;
