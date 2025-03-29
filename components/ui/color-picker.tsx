'use client';

import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';

import { ChevronRight } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';

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
  const parsedStoreValue = `#${storedValue}`;
  const [value, setValue] = useState(parsedStoreValue || '#FFFFFF');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setValue(parsedStoreValue);
  }, [open, parsedStoreValue]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
        <Button
          {...props}
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
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align='end'
        className='mt-2 flex w-full flex-col gap-2'
        // Prevent input autofocus
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div>
          <p className='font-semibold leading-none'>CREAR TEMA</p>
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
        <HexColorPicker color={value} onChange={setValue} />
        <div className='flex w-full gap-2'>
          <Button
            className='w-full'
            variant={'outline'}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className='flex w-full'
            disabled={value === parsedStoreValue}
            onClick={() => {
              onSubmit(value);
              setOpen(false);
            }}
          >
            Crear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
