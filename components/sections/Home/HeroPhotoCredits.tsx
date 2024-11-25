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
import { Link } from 'lucide-react';

const HeroPhotoCredits: FC<{ children: ReactNode }> = memo(
  function HeroPhotoCredits({ children }) {
    const {
      photo: { info },
    } = useTheme();

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{children}</TooltipTrigger>
          <TooltipContent
            className='px-2 py-1 h-fit group'
            side='right'
            key={info?.url}
          >
            <TooltipArrow className='fill-primary' />
            <a href={info?.photographer_url} target='_blank'>
              <div className='flex gap-1.5 items-center'>
                <Image
                  src={PexelIcon}
                  alt='pexel-icon'
                  className='size-6 rounded-sm'
                />
                <span className='text-lg font-medium tracking-wide'>
                  {info?.photographer}
                </span>
                <Link
                  size={18}
                  className='transition-colors text-neutral-500 group-hover:text-neutral-700'
                />
              </div>
            </a>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

export default HeroPhotoCredits;
