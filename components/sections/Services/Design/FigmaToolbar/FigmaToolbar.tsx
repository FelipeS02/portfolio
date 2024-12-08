import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';
import {
  Chevron,
  Comment,
  Frame,
  Move,
  Pen,
  Plugins,
  Rectangle,
  Text,
  DevMode as DevModeIcon,
} from './Icons';
import { Separator } from '@/components/ui';

const ToolbarOption: FC<{
  icon: ReactNode;
  dropDown?: boolean;
  selected?: boolean;
}> = ({ icon, selected, dropDown }) => {
  return (
    <div className='flex'>
      <button
        className='p-1 cursor-pointer transition-colors hover:bg-[#383838] size-8 [&_svg]:size-[24px] rounded-[.3125rem] data-[selected=true]:bg-[#0C8CE9]'
        data-selected={selected}
      >
        {icon}
      </button>
      {dropDown ? (
        <button className='h-full cursor-pointer w-4 transition-colors hover:bg-[#383838] [&_svg]:size-[24px] [&_svg]:absolute  [&_svg]:-translate-x-1  rounded-[.3125rem] flex relative items-center'>
          <Chevron />
        </button>
      ) : null}
    </div>
  );
};

const DevMode = () => (
  <div className='p-1 bg-[#383838] border-[#383838] hover:border-[#444444] hover:bg-[#444444] rounded-sm relative w-[40px] h-[24px] flex items-center border'>
    <div className='bg-[#2c2c2c] size-[22px] shadow-dev-mode-icon rounded-[.3125rem] overflow-hidden flex items-center -ml-1'>
      <DevModeIcon />
    </div>
  </div>
);

const FigmaToolbar = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn(
        'shadow-figma-toolbar px-2 w-fit h-fit rounded-[.8125rem] bg-[#2c2c2c] gap-2 flex items-center',
        className
      )}
    >
      <div className='py-2 flex gap-2'>
        <ToolbarOption icon={<Move />} dropDown selected />
        <ToolbarOption icon={<Frame />} dropDown />
        <ToolbarOption icon={<Rectangle />} dropDown />
        <ToolbarOption icon={<Pen />} dropDown />
        <ToolbarOption icon={<Text />} />
        <ToolbarOption icon={<Comment />} />
        <ToolbarOption icon={<Plugins />} />
      </div>
      <Separator
        orientation='vertical'
        className='bg-[#444444] w-[1px] h-12 self-stretch'
      />
      <DevMode />
    </div>
  );
};

export default FigmaToolbar;
