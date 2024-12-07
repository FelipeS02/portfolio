import { cn } from '@/lib/utils';
import { Boxes } from 'lucide-react';

const technologies = [
  'NextJS',
  'Typescript',
  'ReactJS',
  'NodeJS',
  'NestJS',
  'SQL',
  'GSAP',
  '.NetCore',
  'SASS',
  'LESS',
  'Redux',
];

const TechnologiesListItem = ({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) => {
  return (
    <li
      className={cn(
        'last-of-type:border-0 first-of-type:border-t-2 border-b-2 border-palette-600 py-8 text-6xl lg:text-8xl font-neue text-pretty',
        className
      )}
    >
      <h6>{name}</h6>
    </li>
  );
};

const TechnologiesList = () => {
  return (
    <div className='min-h-screen flex flex-col gap-3 px-4 lg:px-14 w-full relative bg-background/50 md:backdrop-blur-sm'>
      <span className='sr-only'>Tech stack</span>
      <h5 className='flex gap-1 items-center text-2xl lg:text-3xl font-medium font-archivo'>
        <Boxes size={30} strokeWidth={1.5} className='text-inherit' /> STACK
      </h5>
      <ul>
        {technologies.map((name) => (
          <TechnologiesListItem name={name} key={`list-tech-${name}`} />
        ))}
        <TechnologiesListItem name='Abierto a nuevas tecnologías' className='text-4xl lg:text-6xl font-medium'/>
      </ul>
    </div>
  );
};

export default TechnologiesList;
