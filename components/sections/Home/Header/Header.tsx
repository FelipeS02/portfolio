import { Dot } from "lucide-react";
import { ReactNode } from "react";
import HeaderShortcuts from "./HeaderShortcuts";

const HeaderText = ({
  title,
  subtitle,
}: {
  title: string | ReactNode;
  subtitle: string | ReactNode;
}) => {
  return (
    <div className='flex flex-col col-span-1 w-full text-md tracking-wide font-medium'>
      <span className='text-palette-100'>{title}</span>
      <span className='text-palette-900'>{subtitle}</span>
    </div>
  );
};

const Header = () => {
  return (
    <header className='grid grid-cols-3'>
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
     <HeaderShortcuts />
    </header>
  );
};

export default Header;
