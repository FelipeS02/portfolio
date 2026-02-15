'use client';

import { CSSProperties, FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { DialogTitle } from '@radix-ui/react-dialog';
import { ChevronRight } from 'lucide-react';
import tinycolor from 'tinycolor2';
import { useMediaQuery } from 'usehooks-ts';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

import {
  Drawer,
  DrawerContent,
  DrawerHandle,
  DrawerTrigger,
} from '../ui/drawer';

interface ColorPickerProps {
  value: string;
  onSubmit: (value: string) => void;
  onBlur?: () => void;
}
const ColorPicker: FC<
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur' | 'onSubmit'> &
    ColorPickerProps
> = ({
  disabled,
  value: storedValue,
  onSubmit,
  onBlur,
  name,
  className,
  ...props
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const parsedStoreValue = `#${storedValue}`;
  const [value, setValue] = useState(parsedStoreValue || '#FFFFFF');
  const [open, setOpen] = useState(false);

  const TriggerButton = (
    <Button
      className={cn('block', className)}
      name={name}
      onClick={() => {
        setOpen(true);
      }}
      size='icon'
      style={{
        backgroundColor: parsedStoreValue,
      }}
      variant='outline'
      {...props}
    >
      <div />
    </Button>
  );

  const Title = isMobile ? DialogTitle : 'p';

  const Content = (
    <>
      <div>
        <Title className='font-semibold'>CREAR TEMA</Title>
        <div className='inline-flex w-full items-center text-sm font-semibold'>
          <span
            style={{
              color: parsedStoreValue,
            }}
          >
            {parsedStoreValue}
          </span>
          <ChevronRight size={18} className='text-foreground-secondary/40' />
          <input
            style={{ all: 'unset', color: value, maxWidth: '8em' }}
            value={value}
            maxLength={7}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <HexColorPicker
        className='max-md:w-full max-md:[&_]:w-[100%_!important]'
        color={value}
        onChange={setValue}
      />
      <div className='flex w-full gap-2'>
        <Button
          className='w-full'
          variant='outline'
          onClick={() => setOpen(false)}
        >
          Cancelar
        </Button>
        <Button
          disabled={value === parsedStoreValue}
          onClick={() => {
            onSubmit(value);
            setOpen(false);
          }}
          style={
            {
              '--_new-color': value,
              '--_text-color': tinycolor(value).isLight() ? 'black' : 'white',
            } as CSSProperties
          }
          className='flex w-full bg-(--_new-color) text-(--_text-color) transition-none hover:bg-(--_new-color) hover:contrast-125'
        >
          <span className='transition-colors duration-200'>Crear</span>
        </Button>
      </div>
    </>
  );

  if (isMobile) {
    return (
      <Drawer direction='top' onOpenChange={setOpen} open={open} handleOnly>
        <DrawerTrigger asChild disabled={disabled} onBlur={onBlur}>
          {TriggerButton}
        </DrawerTrigger>
        <DrawerContent
          className='space-y-4 p-4'
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {Content}
          <DrawerHandle />
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
        {TriggerButton}
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='mt-2 flex w-full flex-col gap-2'
        // Prevent input autofocus
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {Content}
      </PopoverContent>
    </Popover>
  );
};

ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
