'use client';

import ThemeSwitch from '@/components/ui/ThemeSwitch';
import { useScheme } from '@/hooks/theme';
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

const ShortcutSeparator = () => (
  <Separator className='h-6 w-[1px] bg-foreground-secondary' orientation='vertical' />
);

export default function HeaderShortcuts() {
  return (
    <div className='col-span-1 flex justify-end gap-3 h-fit items-center'>
      <CurriculumShortcut />
      <ShortcutSeparator />
      <ThemeSwitch />
    </div>
  );
}
