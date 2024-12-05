'use client';

import { FC, useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@/components/ui/Button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { ChevronRight } from 'lucide-react';

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
      <PopoverContent align='end' className='w-full flex flex-col gap-2 mt-2'>
        <div>
          <p className='font-semibold leading-none'>Crear nuevo tema</p>
          <div className='inline-flex w-full items-center font-semibold text-sm'>
            <span
              style={{
                color: parsedStoreValue,
              }}
            >
              {parsedStoreValue}
            </span>
            <ChevronRight size={18} className='text-foreground-secondary/40' />
            <span style={{ color: value }}>{value}</span>
          </div>
        </div>
        <HexColorPicker color={value} onChange={setValue} />
        <div className='w-full flex gap-2'>
          <Button
            className='w-full'
            variant={'outline'}
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            className='w-full flex'
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
