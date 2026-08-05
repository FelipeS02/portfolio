'use client';

import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

import { ChevronDown, Earth } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const LOCALE_LABEL_KEYS: Record<(typeof routing.locales)[number], string> = {
  es: 'spanish',
  en: 'english',
};

const LanguageSwitch = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const t = useTranslations('LanguageSwitch');

  const query = searchParams.toString();

  const switchLocale = (nextLocale: (typeof routing.locales)[number]) => {
    router.replace(`${pathname}${query ? `?${query}` : ''}`, {
      locale: nextLocale,
    });
  };

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
            disabled={localeOption === locale}
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
