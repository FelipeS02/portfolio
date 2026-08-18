import { CvContent } from './types';

const es: CvContent = {
  locale: 'es',
  name: 'Felipe Saracho',
  role: 'Desarrollador Full-Stack',
  contact: [
    { label: 'GitHub', href: 'https://github.com/FelipeS02' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/felipe-saracho/' },
    { label: 'fsaracho.dev', href: 'https://fsaracho.dev' },
    {
      label: 'felipesaracho02@gmail.com',
      href: 'mailto:felipesaracho02@gmail.com',
    },
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
    'Desarrollador Front-End/Full-Stack con +3 años de experiencia en productos web y SaaS, especializado en React, Next.js y TypeScript. Experiencia definiendo Design Systems, optimizando performance e integrando arquitecturas serverless. Foco en calidad, escalabilidad y experiencia de usuario.',
  experience: [
    {
      role: 'Front-End Developer',
      company: 'ITROCK',
      dateRanges: ['Marzo 2025 - Actualidad'],
      bullets: [
        <>
          Definí el Design System y los estándares técnicos (Tailwind CSS, Zod,
          shadcn/ui) de un proyecto y se adoptaron como estándar en{' '}
          <strong>5 proyectos Next.js</strong>, 2 de ellos sin mi participación.
        </>,
        <>
          Refactoricé aplicaciones de alta complejidad reduciendo deuda técnica,
          y estandaricé contratos de datos entre frontend y backend con
          TypeScript y Zod.
        </>,
        <>
          Desarrollé funcionalidades críticas para plataformas financieras y
          corporativas — sistemas documentales, suscripciones y reservas online
          — con autenticación vía Azure AD (MSAL) y cookies HttpOnly, e
          integración de pagos con Stripe y PayPal.
        </>,
        <>
          Optimicé rendimiento mediante virtualización de listas y gestión
          eficiente de grandes volúmenes de datos.
        </>,
        <>
          Desarrollé y mantuve arquitecturas serverless sobre AWS Lambda con
          colas SQS, procesamiento multimedia y generación documental con
          Puppeteer.
        </>,
        <>
          Automaticé la generación de código y casos de prueba con herramientas
          asistidas por IA, impulsando su adopción como práctica en el equipo.
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
      company: 'FSARACHO (freelance)',
      dateRanges: ['Junio 2024 - Actualidad'],
      bullets: [
        <>
          <strong>Mindtú</strong> (jun.–jul. 2026): Desarrollé de punta a punta
          la plataforma web de una productora audiovisual y academia de
          creadores, con Next.js 16, React 19 y TypeScript estricto — landing
          institucional + sección de academia con formularios diferenciados para
          dos audiencias.
        </>,
        <>
          <strong>AYEMAG</strong> (agosto 2025): Desarrollé la landing comercial
          de un fabricante de contenedores flexibles industriales, con Astro y
          React, incluyendo flujo de generación de leads validado con Zod.
        </>,
      ],
      stack: [
        'Next.js',
        'Astro',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'shadcn/ui',
        'Framer Motion',
        'GSAP',
        'Zod',
        'React Hook Form',
        'Figma',
      ],
    },
    {
      role: 'Full-Stack Developer',
      company: 'AndesIA (freelance, en equipo)',
      dateRanges: ['Enero 2025 - Junio 2025'],
      bullets: [
        <>
          Diseñé y desarrollé el frontend completo de LICAUT, una plataforma
          SaaS para gestión y automatización de licitaciones de reposición de
          parabrisas para aseguradoras, con React, Vite, TypeScript y shadcn/ui.
        </>,
        <>
          Implementé desde cero el sistema de colas asíncronas con BullMQ +
          Redis que orquesta el scraping de licitaciones y la automatización de
          carga documental.
        </>,
        <>
          Colaboré en la arquitectura backend (NestJS), profundizando en el
          mantenimiento del sistema de extracción documental integrado con
          múltiples proveedores de IA.
        </>,
        <>
          El producto se comercializó a Todo Parabrisas, cliente para el que
          además desarrollé la landing institucional.
        </>,
      ],
      stack: [
        'React',
        'Vite',
        'TypeScript',
        'shadcn/ui',
        'NestJS',
        'BullMQ',
        'Redis',
        'Prisma',
        'Zod',
        'Playwright',
        'Astro',
        'Three.js',
        'GSAP',
      ],
    },
    {
      role: 'Front-End Developer',
      company: <span className='text-[#4659A9]'>LILAB</span>,
      dateRanges: ['Nov. 2021 - Mar. 2023', 'Dic. 2023 - Jun. 2024'],
      bullets: [
        <>
          Lideré la producción integral de una aplicación web del sector
          FinTech, desarrollando la aplicación completa y diseñando la
          experiencia UX/UI, asegurando coherencia con la marca.
        </>,
        <>
          Implementé un sistema de diseño basado en TypeScript, Atomic Design y
          principios SOLID, logrando componentes reutilizables y bien tipados.
        </>,
        <>
          Creé el primer sistema de diseño y flujo en Figma del equipo,
          mejorando la consistencia entre diseño y desarrollo.
        </>,
        <>
          Trabajé bajo SCRUM y KANBAN con múltiples equipos; recibí
          reconocimiento del cliente por innovación y creatividad.
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
        { level: 'Intermedios', items: 'C#, SQL (PostgreSQL, MySQL)' },
        { level: 'Básico', items: 'Python' },
      ],
    },
    {
      title: 'Frameworks',
      entries: [
        {
          level: 'Avanzado',
          items: 'ReactJS, Next.js, Tailwind CSS, Bootstrap',
        },
        { level: 'Intermedio', items: 'Astro, Node.js, ExpressJS, NestJS' },
        { level: 'Básico', items: '.NET Core' },
      ],
    },
    {
      title: 'Herramientas',
      entries: [
        {
          items:
            'Zustand, SASS, LESS, Docker (básico), optimización SEO (Google Search Console), automatización asistida por IA.',
        },
      ],
    },
    {
      title: 'Idiomas',
      entries: [
        { level: 'Español', items: 'Nativo' },
        {
          level: 'Inglés',
          items: 'B2 general | C2 en lectura y escucha (EF SET, 72/100)',
        },
        { level: 'Italiano', items: 'Básico' },
      ],
    },
  ],
  education: [
    { title: 'Desarrollo Web Full-Stack / HENRY', date: 'Oct. 2021' },
  ],
  certifications: ['Yo Puedo Programar | JAA x Microsoft'],
};

export default es;
