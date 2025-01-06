import { FC } from 'react';

import { cn } from '@/lib/utils';

import styles from './radar.module.css';

const Lines: FC<{ className: string }> = ({ className = '' }) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      className={className}
    >
      <path
        d='M11.985 23.9652C5.38519 23.9652 0.035 18.6151 0.035 12.0153C0.035 5.41543 5.38519 0.0652734 11.985 0.0652734C18.5848 0.0652734 23.935 5.41543 23.935 12.0153C23.935 18.6151 18.5848 23.9652 11.985 23.9652Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9851 22.5231C6.18159 22.5231 1.47689 17.8183 1.47689 12.0148C1.47689 6.21134 6.18159 1.50668 11.9851 1.50668C17.7886 1.50668 22.4933 6.21134 22.4933 12.0148C22.4933 17.8183 17.7886 22.5231 11.9851 22.5231Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9852 21.0818C6.97796 21.0818 2.91879 17.0226 2.91879 12.0154C2.91879 7.00822 6.97796 2.94906 11.9852 2.94906C16.9924 2.94906 21.0515 7.00822 21.0515 12.0154C21.0515 17.0226 16.9924 21.0818 11.9852 21.0818Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9848 19.6396C7.77382 19.6396 4.3602 16.226 4.3602 12.015C4.3602 7.80408 7.77382 4.39047 11.9848 4.39047C16.1957 4.39047 19.6094 7.80408 19.6094 12.015C19.6094 16.226 16.1957 19.6396 11.9848 19.6396Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9849 18.1974C8.5702 18.1974 5.80209 15.4293 5.80209 12.0146C5.80209 8.59998 8.5702 5.83188 11.9849 5.83188C15.3995 5.83188 18.1676 8.59998 18.1676 12.0146C18.1676 15.4293 15.3995 18.1974 11.9849 18.1974Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9849 16.7562C9.36657 16.7562 7.24398 14.6336 7.24398 12.0153C7.24398 9.39689 9.36657 7.27426 11.9849 7.27426C14.6033 7.27426 16.7259 9.39689 16.7259 12.0153C16.7259 14.6336 14.6033 16.7562 11.9849 16.7562Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9851 15.314C10.1629 15.314 8.68588 13.8369 8.68588 12.0148C8.68588 10.1927 10.1629 8.71566 11.9851 8.71566C13.8071 8.71566 15.2842 10.1927 15.2842 12.0148C15.2842 13.8369 13.8071 15.314 11.9851 15.314Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9851 13.8727C10.9593 13.8727 10.1278 13.0412 10.1278 12.0154C10.1278 10.9896 10.9593 10.158 11.9851 10.158C13.0109 10.158 13.8425 10.9896 13.8425 12.0154C13.8425 13.0412 13.0109 13.8727 11.9851 13.8727Z'
        fill='none'
        stroke-width='0.07'
      />
      <path
        d='M11.9848 12.4306C11.7552 12.4306 11.5692 12.2445 11.5692 12.015C11.5692 11.7855 11.7553 11.5995 11.9848 11.5995C12.2143 11.5995 12.4003 11.7855 12.4003 12.015C12.4003 12.2445 12.2143 12.4306 11.9848 12.4306Z'
        fill='none'
        stroke-width='0.07'
      />
      <path d='M12.0152 0H11.9551V24.03H12.0152V0Z' stroke='none' />
      <path
        d='M-0.0302734 11.9854V12.0454H23.9998V11.9854H-0.0302734Z'
        stroke='none'
      />
      <path
        d='M-0.00878998 -0.0214844L-0.0512695 0.0209951L23.9792 24.0514L24.0216 24.009L-0.00878998 -0.0214844Z'
        stroke='none'
      />
      <path
        d='M24.0216 0.0209951L23.9792 -0.0214844L-0.0512695 24.009L-0.00879007 24.0514L24.0216 0.0209951Z'
        stroke='none'
      />
    </svg>
  );
};

const Radar: FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'pointer-events-none relative aspect-square overflow-hidden rounded-full border-2 border-palette-500',
        styles.radar,
        className,
      )}
      style={{
        maskImage:
          'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 35%)',
      }}
    >
      <Lines className='absolute size-full fill-palette-600/40 stroke-palette-600/20' />
    </div>
  );
};

export default Radar;
