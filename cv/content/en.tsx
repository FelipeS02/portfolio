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
    'Full-Stack Developer with 3+ years of experience building scalable web applications with React, Next.js and TypeScript. Experience in frontend architecture, Design Systems, API integration and performance optimization. Focused on technical quality, user experience, and maintainable, scalable solutions.',
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
      company: 'Freelance',
      dateRanges: ['June 2024 - Present'],
      bullets: [
        <>
          <strong>AndesIA</strong> — End-to-end development of a SaaS platform for managing
          insurance tenders: landing page, backoffice, and a BullMQ + Redis queue system that
          automates scraping across multiple sites, handling concurrent tasks and publishing
          results reliably.
        </>,
        <>
          <strong>FSARACHO</strong> — Designed and built landing pages for companies across
          different industries.
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
        { level: 'Intermediate', items: 'C#, SQL' },
        { level: 'Basic', items: 'Python' },
      ],
    },
    {
      title: 'Frameworks',
      entries: [
        { level: 'Advanced', items: 'ReactJS, Next.js, Tailwind CSS, Bootstrap' },
        { level: 'Intermediate', items: 'Node.js, ExpressJS, NestJS' },
        { level: 'Basic', items: '.NET Core' },
      ],
    },
    {
      title: 'Databases',
      entries: [{ level: 'Intermediate', items: 'PostgreSQL, MySQL' }],
    },
    {
      title: 'Tools',
      entries: [
        {
          items:
            'Figma, Jest, Playwright, Puppeteer, MaterialUI, React Bootstrap, ClickUp, Jira, Redux, SASS - LESS, Docker (basic), GSAP, Prisma, shadcn/ui, AI-assisted automation.',
        },
      ],
    },
    {
      title: 'Languages (spoken)',
      entries: [
        { level: 'Native', items: 'Spanish' },
        { level: 'Intermediate', items: 'English (B1)' },
        { level: 'Basic', items: 'Italian' },
      ],
    },
    {
      title: 'Soft Skills',
      entries: [
        {
          items:
            'Teamwork, creativity, critical thinking, problem-solving, adaptability and continuous improvement.',
        },
      ],
    },
  ],
  education: [{ title: 'Full-Stack Web Development / HENRY', date: 'Oct. 2021' }],
  certifications: [
    'English: C2 Proficient (reading and listening) | EF SET',
    'Yo Puedo Programar | JAA x Microsoft',
  ],
};

export default en;
