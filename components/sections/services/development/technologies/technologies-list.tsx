import { Boxes } from 'lucide-react';

import {
  DevelopmentList,
  DevelopmentListTitle,
} from '@/components/ui/development_list';
import { ListItem } from '@/components/ui/list-item';

const technologies = [
  'NextJS',
  'Typescript',
  'GSAP',
  'Framer Motion',
  'Redux / Zustand',
  'TailwindCSS',
];

const TechnologiesList = () => {
  return (
    <DevelopmentList>
      <span className='sr-only'>Tech stack</span>
      <DevelopmentListTitle className='flex items-center gap-2'>
        <Boxes /> <span>STACK</span>
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
