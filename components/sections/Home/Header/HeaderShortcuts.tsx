'use client';

import { ColorPicker } from '@/components/ui/ColorPicker';
import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { useScheme, useTheme } from '@/hooks/theme';
import { Separator } from '@radix-ui/react-separator';
import { Download } from 'lucide-react';
import { memo } from 'react';

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

export const ThemePicker = () => {
  const { hexCode, getNewTheme, fullfiled } = useTheme();

  if (!fullfiled || !getNewTheme) return null;

  return (
    <ColorPicker value={hexCode} onSubmit={getNewTheme} className='size-7' />
  );
};

const ShortcutSeparator = () => (
  <Separator
    className='h-6 w-[1px] bg-foreground-secondary'
    orientation='vertical'
  />
);

export default function HeaderShortcuts() {
  return (
    <div className='col-span-1 w-fit flex md:w-full justify-end gap-3 items-center'>
      <CurriculumShortcut />
      <ShortcutSeparator />
      <ThemeSwitch />
      <ShortcutSeparator />
      <ThemePicker />
    </div>
  );
}
