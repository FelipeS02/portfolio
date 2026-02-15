import { Boxes } from 'lucide-react';

import {
  DevelopmentList,
  DevelopmentListTitle,
} from '@/components/common/development-list';
import { ListItem } from '@/components/common/list-item';

const technologies = [
  'NextJS | Astro',
  'Typescript',
  'GSAP | Framer',
  'Redux | Zustand',
  'TailwindCSS',
];

const TechnologiesList = () => {
  return (
    <DevelopmentList>
      <span className='sr-only'>Tech stack</span>
      <DevelopmentListTitle>
        <Boxes /> <span>STACK</span>
      </DevelopmentListTitle>
      <ul>
        {technologies.map((name) => (
          <ListItem className='text-6xl lg:text-8xl' key={`list-tech-${name}`}>
            <h6>{name}</h6>
          </ListItem>
        ))}

        <ListItem className='relative text-4xl font-medium lg:text-6xl overflow-x-visible'>
          <h6 className='z-2'>Abierto a nuevas tecnologías</h6>
         
        </ListItem>
      </ul>
    </DevelopmentList>
  );
};

export default TechnologiesList;
