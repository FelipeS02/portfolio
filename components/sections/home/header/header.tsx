import { memo, ReactNode } from 'react';
import Link from 'next/link';

import HeaderShortcuts from './shortcuts';

const HeaderText = ({
  title,
  subtitle,
}: {
  title: string | ReactNode;
  subtitle: string | ReactNode;
}) => {
  return (
    <div className='text-md col-span-1 flex w-full flex-col tracking-wide'>
      <p className='text-foreground-secondary'>{title}</p>
      <p className='text-foreground'>{subtitle}</p>
    </div>
  );
};

const Header = memo(function Header() {
  return (
    <header className='flex w-full grid-cols-3 justify-between lg:grid'>
      <div className='flex flex-col gap-6 lg:contents'>
        <HeaderText
          title={
            <span className='flex items-center gap-2'>
              DISPONIBLE{' '}
              <span className='mb-[4px] size-1 animate-ping rounded-full bg-foreground-secondary' />
            </span>
          }
          subtitle='FELIPESARACHO02@GMAIL.COM'
        />
        <HeaderText
          title={
            <Link
              href='https://maps.app.goo.gl/iutWWLmzkCWbjGz6A'
              target='_blank'
            >
              34° 45’ 46.02” S 58° 12’ 41.20” W
            </Link>
          }
          subtitle='BUENOS AIRES'
        />
        <HeaderShortcuts />
      </div>
    </header>
  );
});

export default Header;
