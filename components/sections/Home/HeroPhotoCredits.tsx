'use client';

import { FC, memo, ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useTheme } from '@/hooks/theme';
import { TooltipArrow } from '@radix-ui/react-tooltip';
import PexelIcon from '@/public/assets/icons/pexels.svg';
import Image from 'next/image';

const HeroPhotoCredits: FC<{ children: ReactNode }> = memo(
  function HeroPhotoCredits({ children }) {
    const { photo } = useTheme();

    if (!photo.url) return null;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>{children}</TooltipTrigger>
          <TooltipContent
            className='px-2 py-1 h-fit'
            side='right'
            key={photo.url}
          >
            <TooltipArrow className='fill-primary' />
            <a href={photo?.photographer_url} target='_blank'>
              <div className='flex gap-1.5 items-center'>
                <Image src={PexelIcon} alt='pexel-icon' className='size-6 rounded-sm'/>
                <span className='text-lg font-medium tracking-wide'>
                  {photo?.photographer}
                </span>
              </div>
            </a>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export default HeroPhotoCredits;
