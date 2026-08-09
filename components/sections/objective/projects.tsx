import { ReactNode } from 'react';
import { StaticImageData } from 'next/image';

import AyemagMiniature from '@/public/assets/images/ayemag.webp';
import LicautMiniature from '@/public/assets/images/licaut.webp';
import MindtuMiniature from '@/public/assets/images/mindtu.webp';
import TodoparabrisasMiniature from '@/public/assets/images/todoparabrisas.webp';

import { PROJECT_ICONS } from './icons';

export type TechnologyKey = keyof typeof PROJECT_ICONS;

/**
 * A single, already-composed asset: the backdrop + site-preview composition is
 * baked into the file, so `type` only drives which element renders it.
 */
export type ProjectMedia =
  | { type: 'image'; src: StaticImageData; alt: string }
  | { type: 'video'; src: string; alt: string; poster?: string };

export type Project = {
  id: string;
  /** Brand name, never translated */
  title: ReactNode;
  /** Key under the `Objective.roles` message namespace */
  roleKey: string;
  /** Accent color the highlighted words adopt while this project is centered */
  color: string;
  technologies: TechnologyKey[];
  /** Live site. Omit it and the card renders without a CTA */
  href?: string;
  media: ProjectMedia;
};

/** Media lives in `public/assets/projects/`, one composed file per project. */
export const PROJECTS: Project[] = [
  {
    id: 'mindtu',
    title: 'MINDTÚ',
    roleKey: 'designAndDevelopment',
    color: '#e7000b',
    technologies: ['tailwind', 'next', 'figma', 'framerMotion'],
    href: 'https://mindtu.net/',
    media: {
      type: 'image',
      src: MindtuMiniature,
      alt: 'MINDTÚ website',
    },
  },
  {
    id: 'ayemag',
    title: 'AYEMAG',
    roleKey: 'designAndDevelopment',
    color: '#1B3A8C',
    technologies: ['tailwind', 'astro', 'figma', 'gsap'],
    href: 'https://ayemag.net',
    media: {
      type: 'image',
      src: AyemagMiniature,
      alt: 'AYEMAG website',
    },
  },

  {
    id: 'todoparabrisas',
    title: (
      <>
        TODO <br /> PARABRISAS
      </>
    ),
    roleKey: 'development',
    color: '#ce1c1c',
    technologies: ['tailwind', 'astro', 'gsap'],
    href: 'https://todoparabrisas.com.ar/',
    media: {
      type: 'image',
      src: TodoparabrisasMiniature,
      alt: 'TODO PARABRISAS website',
    },
  },
  {
    id: 'licaut',
    title: 'LICAUT',
    roleKey: 'designAndDevelopment',
    color: '#ce1c1c',
    technologies: ['tailwind', 'react', 'framerMotion', 'nest', 'figma'],
    media: {
      type: 'image',
      src: LicautMiniature,
      alt: 'LICAUT website',
    },
  },
];
