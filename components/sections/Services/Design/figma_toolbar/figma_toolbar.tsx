import { FC, ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

import {
  Chevron,
  Comment,
  DevMode as DevModeIcon,
  Frame,
  Move,
  Pen,
  Plugins,
  Rectangle,
  Text,
} from './icons';

const ToolbarOption: FC<{
  icon: ReactNode;
  dropDown?: boolean;
  selected?: boolean;
}> = ({ icon, selected, dropDown }) => {
  return (
    <div className='flex'>
      <button
        className='size-8 cursor-pointer rounded-[.3125rem] p-1 transition-colors hover:bg-[#383838] data-[selected=true]:bg-[#0C8CE9] [&_svg]:size-[24px]'
        data-selected={selected}
      >
        {icon}
      </button>
      {dropDown ? (
        <button className='relative flex h-full w-4 cursor-pointer items-center rounded-[.3125rem] transition-colors hover:bg-[#383838] [&_svg]:absolute [&_svg]:size-[24px] [&_svg]:-translate-x-1'>
          <Chevron />
        </button>
      ) : null}
    </div>
  );
};

const DevMode = () => (
  <div className='relative flex h-[24px] w-[40px] items-center rounded-sm border border-[#383838] bg-[#383838] p-1 hover:border-[#444444] hover:bg-[#444444]'>
    <div className='-ml-1 flex size-[22px] items-center overflow-hidden rounded-[.3125rem] bg-[#2c2c2c] shadow-dev-mode-icon'>
      <DevModeIcon />
    </div>
  </div>
);

const FigmaToolbar = ({ className = '' }: { className?: string }) => {
  return (
    <div
      className={cn(
        'flex h-fit w-fit items-center gap-2 rounded-[.8125rem] bg-[#2c2c2c] px-2 shadow-figma-toolbar',
        className,
      )}
    >
      <div className='flex gap-2 py-2'>
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
        className='h-12 w-[1px] self-stretch bg-[#444444]'
      />
      <DevMode />
    </div>
  );
};

export default FigmaToolbar;
