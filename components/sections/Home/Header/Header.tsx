import { Dot } from 'lucide-react';
import { ReactNode } from 'react';
import HeaderShortcuts from './HeaderShortcuts';

const HeaderText = ({
  title,
  subtitle,
}: {
  title: string | ReactNode;
  subtitle: string | ReactNode;
}) => {
  return (
    <div className='flex flex-col col-span-1 w-full text-md tracking-wide font-medium'>
      <span className='text-foreground-secondary'>{title}</span>
      <span className='text-foreground'>{subtitle}</span>
    </div>
  );
};

const Header = () => {
  return (
    <header className='w-full flex justify-between lg:grid grid-cols-3'>
      <div className='flex flex-col lg:contents gap-4'>
        <HeaderText
          title={
            <div className='flex'>
              DISPONIBLE <Dot className='animate-ping' size={26} />
            </div>
          }
          subtitle='FELIPESARACHO02@GMAIL.COM'
        />
        <HeaderText
          title='34º 45’ 43.20” S 58º 12’ 40.63” W'
          subtitle='BUENOS AIRES'
        />
      </div>
      <HeaderShortcuts />
    </header>
  );
};

export default Header;
