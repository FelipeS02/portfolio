import { LucideProps } from 'lucide-react';
import NodeJs from '@/components/ui/icons/NodeJS';
import NestJS from '@/components/ui/icons/NestJS';
import ReactJS from '@/components/ui/icons/ReactJs';
import TailwindCSS from '@/components/ui/icons/TailwindCSS';
import Typescript from '@/components/ui/icons/Typescript';
import MySQL from '@/components/ui/icons/MySQL';
import Html5 from '@/components/ui/icons/Html5';
import Css from '@/components/ui/icons/Css';
import Gsap from '@/components/ui/icons/Gsap';
import CSharp from '@/components/ui/icons/CSharp';
import { memo } from 'react';

const iconProps: LucideProps = {
  size: 30,
  strokeWidth: 0.25,
  absoluteStrokeWidth: true,
  className:
    'text-palette-800 fill-palette-800 dark:text-palette-100 dark:fill-palette-100 grayscale opacity-75 hover:grayscale-0 hover:opacity-100 transition-opacity transition-all [&>#letter]:fill-palette-100 dark:[&>#letter]:fill-palette-800 duration-500',
};

const TechnologiesBanner = memo(function TechonologiesBanner() {
  return (
    <div className='hidden md:flex gap-2 items-center'>
      <NodeJs {...iconProps} />
      <NestJS {...iconProps} />
      <Gsap viewBox='0 0 82 30' {...iconProps} />
      <ReactJS {...iconProps} />
      <MySQL {...iconProps} />
      <CSharp viewBox='0 0 256 288' {...iconProps} />
      <Typescript {...iconProps} />
      <Css
        viewBox='0 0 1000 1000'
        {...iconProps}
        className={`${iconProps.className} scale-[.85]`}
      />
      <TailwindCSS {...iconProps} />
      <Html5 {...iconProps} />
    </div>
  );
});

export default TechnologiesBanner;
