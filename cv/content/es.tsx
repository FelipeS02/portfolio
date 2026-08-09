import { CvContent } from './types';

const es: CvContent = {
  locale: 'es',
  name: 'Felipe Saracho',
  role: 'Desarrollador Full-Stack',
  contact: [
    { label: 'GitHub', href: 'https://github.com/FelipeS02' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/felipe-saracho/' },
    { label: 'fsaracho.dev', href: 'https://fsaracho.dev' },
    { label: 'felipesaracho02@gmail.com', href: 'mailto:felipesaracho02@gmail.com' },
  ],
  labels: {
    about: 'Sobre mí_',
    experience: 'Experiencia_',
    skills: 'Habilidades_',
    education: 'Educación_',
    certifications: 'Certificaciones_',
    stack: 'Stack:',
  },
  about:
    'Desarrollador Full-Stack con más de 3 años de experiencia construyendo aplicaciones web escalables con React, Next.js y TypeScript. Experiencia en arquitectura frontend, Design Systems, integración de APIs y optimización de rendimiento. Orientado a la calidad técnica, la experiencia de usuario y el desarrollo de soluciones mantenibles y escalables.',
  experience: [
    {
      role: 'Front-End Developer',
      company: 'ITROCK',
      dateRanges: ['Marzo 2025 - Actualidad'],
      bullets: [
        <>
          Definí el Design System y los estándares técnicos (Tailwind CSS, Zod, shadcn/ui) de un
          proyecto y se adoptaron como estándar en <strong>5 proyectos Next.js</strong>, 2 de
          ellos sin mi participación.
        </>,
        <>
          Refactoricé aplicaciones de alta complejidad reduciendo deuda técnica, y estandaricé
          contratos de datos entre frontend y backend con TypeScript y Zod.
        </>,
        <>
          Desarrollé funcionalidades críticas para plataformas financieras y corporativas —
          sistemas documentales, suscripciones y reservas online — con autenticación vía Azure AD
          (MSAL) y cookies HttpOnly, e integración de pagos con Stripe y PayPal.
        </>,
        <>
          Optimicé rendimiento mediante virtualización de listas y gestión eficiente de grandes
          volúmenes de datos.
        </>,
        <>
          Desarrollé y mantuve arquitecturas serverless sobre AWS Lambda con colas SQS,
          procesamiento multimedia y generación documental con Puppeteer.
        </>,
        <>
          Automaticé la generación de código y casos de prueba con herramientas asistidas por IA,
          impulsando su adopción como práctica en el equipo.
        </>,
      ],
      stack: [
        'React',
        'Next.js',
        'TypeScript',
        'Tailwind CSS',
        'Zod',
        'React Query',
        'MSAL',
        'AWS Lambda',
        'SQS',
        'Puppeteer',
        'Stripe',
        'PayPal',
        'React Email',
        'Turborepo',
        'FFmpeg',
        'shadcn/ui',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'Freelance',
      dateRanges: ['Junio 2024 - Actualidad'],
      bullets: [
        <>
          <strong>AndesIA</strong> — Producción integral de una aplicación SaaS para la gestión de
          licitaciones en el rubro de seguros: landing, backoffice y un sistema de colas con
          BullMQ + Redis que automatiza el scraping en múltiples sitios, optimizando tareas
          concurrentes y asegurando su publicación de forma escalable.
        </>,
        <>
          <strong>FSARACHO</strong> — Diseñé y desarrollé landing pages para empresas de distintas
          industrias.
        </>,
      ],
      stack: [
        'ReactJS',
        'Vite',
        'Astro',
        'NestJS',
        'TailwindCSS',
        'shadcn/ui',
        'Redis',
        'BullMQ',
        'Playwright',
        'Prisma',
        'Zod',
        'GSAP',
        'Figma',
      ],
    },
    {
      role: 'Front-End Developer',
      company: <span className='text-[#4659A9]'>LILAB</span>,
      dateRanges: ['Nov. 2021 - Mar. 2023', 'Dic. 2023 - Jun. 2024'],
      bullets: [
        <>
          Lideré la producción integral de una aplicación web del sector FinTech, desarrollando la
          aplicación completa y diseñando la experiencia UX/UI, asegurando coherencia con la
          marca.
        </>,
        <>
          Implementé un sistema de diseño basado en TypeScript, Atomic Design y principios SOLID,
          logrando componentes reutilizables y bien tipados.
        </>,
        <>
          Creé el primer sistema de diseño y flujo en Figma del equipo, mejorando la consistencia
          entre diseño y desarrollo.
        </>,
        <>
          Trabajé bajo SCRUM y KANBAN con múltiples equipos; recibí reconocimiento del cliente por
          innovación y creatividad.
        </>,
      ],
      stack: [
        'JavaScript ES6',
        'ReactJS',
        'Redux Toolkit',
        'TypeScript',
        'Jest',
        'ChakraUI',
        'CSS Modules',
        'Figma',
        'Axios',
        'SCRUM',
      ],
    },
  ],
  skills: [
    {
      title: 'Lenguajes',
      entries: [
        { level: 'Avanzados', items: 'JavaScript, TypeScript' },
        { level: 'Intermedios', items: 'C#, SQL' },
        { level: 'Básico', items: 'Python' },
      ],
    },
    {
      title: 'Frameworks',
      entries: [
        { level: 'Avanzado', items: 'ReactJS, Next.js, Tailwind CSS, Bootstrap' },
        { level: 'Intermedio', items: 'Node.js, ExpressJS, NestJS' },
        { level: 'Básico', items: '.NET Core' },
      ],
    },
    {
      title: 'Bases de datos',
      entries: [{ level: 'Intermedios', items: 'PostgreSQL, MySQL' }],
    },
    {
      title: 'Herramientas',
      entries: [
        {
          items:
            'Figma, Jest, Playwright, Puppeteer, MaterialUI, React Bootstrap, ClickUp, Jira, Redux, SASS - LESS, Docker (básico), GSAP, Prisma, shadcn/ui, automatización asistida por IA.',
        },
      ],
    },
    {
      title: 'Idiomas',
      entries: [
        { level: 'Nativo', items: 'Español' },
        { level: 'Intermedio', items: 'Inglés (B1)' },
        { level: 'Básico', items: 'Italiano' },
      ],
    },
    {
      title: 'Soft',
      entries: [
        {
          items:
            'Trabajo en equipo, creatividad, pensamiento crítico, resolución de problemas, adaptabilidad y mejora continua.',
        },
      ],
    },
  ],
  education: [{ title: 'Desarrollo Web Full-Stack / HENRY', date: 'Oct. 2021' }],
  certifications: [
    'Inglés: C2 Proficiente (lectura y escucha) | EF SET',
    'Yo Puedo Programar | JAA x Microsoft',
  ],
};

export default es;
