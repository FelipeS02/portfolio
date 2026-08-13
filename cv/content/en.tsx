import { CvContent } from './types';

const en: CvContent = {
  locale: 'en',
  name: 'Felipe Saracho',
  role: 'Full-Stack Developer',
  contact: [
    { label: 'GitHub', href: 'https://github.com/FelipeS02' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/felipe-saracho/' },
    { label: 'fsaracho.dev', href: 'https://fsaracho.dev' },
    { label: 'felipesaracho02@gmail.com', href: 'mailto:felipesaracho02@gmail.com' },
  ],
  labels: {
    about: 'About_',
    experience: 'Experience_',
    skills: 'Skills_',
    education: 'Education_',
    certifications: 'Certifications_',
    stack: 'Stack:',
  },
  about:
    'Front-End/Full-Stack Developer with 3+ years of experience in web products and SaaS, specialized in React, Next.js and TypeScript. Experience defining Design Systems, optimizing performance and integrating serverless architectures. Focused on quality, scalability and user experience.',
  experience: [
    {
      role: 'Front-End Developer',
      company: 'ITROCK',
      dateRanges: ['March 2025 - Present'],
      bullets: [
        <>
          Defined the Design System and technical standards (Tailwind CSS, Zod, shadcn/ui) for one
          project, which was then adopted as the standard across{' '}
          <strong>5 Next.js projects</strong>, 2 of them without my involvement.
        </>,
        <>
          Refactored high-complexity applications, reducing technical debt and standardizing
          frontend-backend data contracts with TypeScript and Zod.
        </>,
        <>
          Built critical features for financial and corporate platforms — document management
          systems, subscriptions and online booking — with Azure AD (MSAL) authentication and
          HttpOnly cookies, plus Stripe and PayPal payment integrations.
        </>,
        <>
          Optimized performance through list virtualization and efficient handling of large data
          volumes.
        </>,
        <>
          Built and maintained serverless architectures on AWS Lambda with SQS queues, media
          processing, and document generation with Puppeteer.
        </>,
        <>
          Automated code and test case generation using AI-assisted tooling, driving its adoption
          as a team practice.
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
      company: 'AndesIA (freelance, in-team)',
      dateRanges: ['January 2025 - June 2025'],
      bullets: [
        <>
          Designed and built the entire frontend of LICAUT, a SaaS platform for managing and
          automating windshield replacement tenders for insurance companies, with React, Vite,
          TypeScript and shadcn/ui.
        </>,
        <>
          Implemented from scratch the asynchronous queue system with BullMQ + Redis that
          orchestrates tender scraping and automated document submission.
        </>,
        <>
          Contributed to the backend architecture (NestJS), going deep into maintaining the
          document extraction system integrated with multiple AI providers.
        </>,
        <>
          The product was sold to Todo Parabrisas, a client for whom I also built the corporate
          landing page.
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
      role: 'Full-Stack Developer',
      company: 'FSARACHO (freelance)',
      dateRanges: ['June 2024 - Present'],
      bullets: [
        <>
          <strong>Mindtú</strong> (Jun.–Jul. 2026): Built end-to-end the web platform of an
          audiovisual production company and creator academy, with Next.js 16, React 19 and strict
          TypeScript — corporate landing page + academy section with separate forms for two
          audiences.
        </>,
        <>
          <strong>AYEMAG</strong> (August 2025): Built the commercial landing page of an industrial
          flexible container manufacturer, with Astro and React, including a lead generation flow
          validated with Zod.
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
      role: 'Front-End Developer',
      company: <span className='text-[#4659A9]'>LILAB</span>,
      dateRanges: ['Nov. 2021 - Mar. 2023', 'Dec. 2023 - Jun. 2024'],
      bullets: [
        <>
          Led end-to-end development of a FinTech web application, building the full app and
          designing the UX/UI while ensuring brand consistency.
        </>,
        <>
          Implemented a design system based on TypeScript, Atomic Design and SOLID principles,
          delivering reusable, well-typed components.
        </>,
        <>
          Built the team&rsquo;s first design system and workflow in Figma, improving consistency
          between design and development.
        </>,
        <>
          Worked under SCRUM and KANBAN across multiple teams; recognized by the client for
          innovation and creativity.
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
      title: 'Languages',
      entries: [
        { level: 'Advanced', items: 'JavaScript, TypeScript' },
        { level: 'Intermediate', items: 'C#, SQL (PostgreSQL, MySQL)' },
        { level: 'Basic', items: 'Python' },
      ],
    },
    {
      title: 'Frameworks',
      entries: [
        { level: 'Advanced', items: 'ReactJS, Next.js, Tailwind CSS, Bootstrap' },
        { level: 'Intermediate', items: 'Astro, Node.js, ExpressJS, NestJS' },
        { level: 'Basic', items: '.NET Core' },
      ],
    },
    {
      title: 'Tools',
      entries: [
        {
          items:
            'Zustand, SASS, LESS, Docker (basic), SEO optimization (Google Search Console), AI-assisted automation.',
        },
      ],
    },
    {
      title: 'Languages (spoken)',
      entries: [
        { level: 'Spanish', items: 'Native' },
        { level: 'English', items: 'B1 general | C2 in reading and listening (EF SET, 72/100)' },
        { level: 'Italian', items: 'Basic' },
      ],
    },
  ],
  education: [{ title: 'Full-Stack Web Development / HENRY', date: 'Oct. 2021' }],
  certifications: ['Yo Puedo Programar | JAA x Microsoft'],
};

export default en;
