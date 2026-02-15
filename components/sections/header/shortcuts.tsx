'use client';

import { Download } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { ColorPicker } from '@/components/common/color-picker';
import ThemeSwitch from '@/components/common/theme-switch';

import { ENV } from '@/lib/env';
import { useScheme, useTheme } from '@/hooks/theme';

export const CurriculumShortcut = () => {
  const { resolvedTheme } = useScheme();

  const downloadCurriculum = () => {
    const linkByTheme = resolvedTheme === 'light' ? ENV.CV_LIGHT : ENV.CV_DARK;

    window.open(linkByTheme, '_blank');
  };

  return (
    <button
      className='text-foreground inline-flex gap-1'
      onClick={downloadCurriculum}
    >
      <Download size={22} /> <span className='font-semibold'>CV</span>
    </button>
  );
};

export const ThemePicker = () => {
  const { hexCode, getNewTheme, fullfiled } = useTheme();

  if (!fullfiled || !getNewTheme) return null;

  return (
    <ColorPicker
      value={hexCode}
      onSubmit={getNewTheme}
      key={hexCode}
      className='size-7'
    />
  );
};

const ShortcutSeparator = () => (
  <Separator
    className='bg-foreground-secondary h-6 w-px'
    orientation='vertical'
  />
);

const HeaderShortcuts = () => {
  return (
    <div className='col-span-1 flex w-fit items-center justify-end gap-3 lg:w-full'>
      <CurriculumShortcut />

      <ShortcutSeparator />

      <ThemeSwitch />

      <ShortcutSeparator />

      <ThemePicker />
    </div>
  );
};

export default HeaderShortcuts;
