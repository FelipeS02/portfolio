import { Boxes } from 'lucide-react';

import { ListItem } from '@/components/ui/list-item';
import { DevelopmentList, DevelopmentListTitle } from '@/components/layout';

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
    <DevelopmentList>
      <span className='sr-only'>Tech stack</span>
      <DevelopmentListTitle className='flex items-center gap-2'>
        <Boxes size={30} strokeWidth={1.5} className='text-palette-500' /> STACK
      </DevelopmentListTitle>
      <ul>
        {technologies.map((name) => (
          <ListItem className='text-6xl lg:text-8xl' key={`list-tech-${name}`}>
            <h6>{name}</h6>
          </ListItem>
        ))}
        <ListItem className='text-4xl font-medium lg:text-6xl'>
          <h6>Abierto a nuevas tecnologías</h6>
        </ListItem>
      </ul>
    </DevelopmentList>
  );
};

export default TechnologiesList;
