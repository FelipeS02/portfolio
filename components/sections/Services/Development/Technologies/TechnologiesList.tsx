import { ListItem } from '@/components/ui';
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
  'TailwindCSS',
];

const TechnologiesList = () => {
  return (
    <div className='min-h-screen flex flex-col gap-3 px-4 lg:px-14 w-full relative bg-background/50'>
      <span className='sr-only'>Tech stack</span>
      <h5 className='flex gap-1 items-center text-2xl lg:text-3xl font-medium font-archivo'>
        <Boxes size={30} strokeWidth={1.5} className='text-inherit' /> STACK
      </h5>
      <ul>
        {technologies.map((name) => (
          <ListItem name={name} key={`list-tech-${name}`} />
        ))}
        <ListItem
          name='Abierto a nuevas tecnologías'
          className='text-4xl lg:text-6xl font-medium'
        />
      </ul>
    </div>
  );
};

export default TechnologiesList;
