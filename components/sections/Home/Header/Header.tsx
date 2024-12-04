import { Dot } from 'lucide-react';
import { memo, ReactNode } from 'react';
import HeaderShortcuts from './HeaderShortcuts';

const HeaderText = ({
  title,
  subtitle,
}: {
  title: string | ReactNode;
  subtitle: string | ReactNode;
}) => {
  return (
    <div className='flex flex-col col-span-1 w-full text-md tracking-wide'>
      <p className='text-foreground-secondary'>{title}</p>
      <p className='text-foreground'>{subtitle}</p>
    </div>
  );
};

const Header = memo(function Header() {
  return (
    <header className='w-full flex justify-between lg:grid grid-cols-3'>
      <div className='flex flex-col lg:contents gap-6'>
        <HeaderText
          title={
            <span className='flex items-center gap-2'>
              DISPONIBLE{' '}
              <div className='size-1 rounded-full bg-foreground-secondary animate-ping mb-[4px]' />
            </span>
          }
          subtitle='FELIPESARACHO02@GMAIL.COM'
        />
        <HeaderText
          title='34º 45’ 43.20” S 58º 12’ 40.63” W'
          subtitle='BUENOS AIRES'
        />
        <HeaderShortcuts />
      </div>
    </header>
  );
});

export default Header;
