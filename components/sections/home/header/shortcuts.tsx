'use client';

import { memo } from 'react';

import { Separator } from '@radix-ui/react-separator';
import { Download } from 'lucide-react';

import { ColorPicker } from '@/components/ui/color-picker';
import ThemeSwitch from '@/components/ui/theme-switch';

import { useScheme, useTheme } from '@/hooks/theme';

export const CurriculumShortcut = memo(function CurriculumShortcut() {
  const { resolvedTheme } = useScheme();

  const downloadCurriculum = () => {
    const linkByTheme =
      resolvedTheme === 'light'
        ? 'https://drive.usercontent.google.com/u/0/uc?id=1_glfRxF4rrnhHw0Z3OoI54hlFRyileP9&export=download'
        : 'https://drive.usercontent.google.com/u/0/uc?id=1H-BTlm4q-rFgyXAUcrGj3PqP8WjhxWVi&export=download';

    window.open(linkByTheme, '_blank');
  };

  return (
    <button
      className='inline-flex gap-1 text-foreground'
      onClick={downloadCurriculum}
    >
      <Download size={22} /> <span className='font-semibold'>CV</span>
    </button>
  );
});

export const ThemePicker = memo(function ThemePicker() {
  const { hexCode, getNewTheme, fullfiled } = useTheme();

  if (!fullfiled || !getNewTheme) return null;

  return (
    <ColorPicker value={hexCode} onSubmit={getNewTheme} className='size-7' />
  );
});

const ShortcutSeparator = () => (
  <Separator
    className='h-6 w-[1px] bg-foreground-secondary'
    orientation='vertical'
  />
);

const HeaderShortcuts = memo(function HeaderShortcuts() {
  return (
    <div className='col-span-1 flex w-fit items-center justify-end gap-3 lg:w-full'>
      <CurriculumShortcut />
      <ShortcutSeparator />
      <ThemeSwitch />
      <ShortcutSeparator />
      <ThemePicker />
    </div>
  );
});

export default HeaderShortcuts;
