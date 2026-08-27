#import "@preview/silver-dev-cv:1.0.2": *
// Overrides the template's cv/section/job/education/project helpers so they
// use the display font and the themed palette; must come after the package
// import to shadow it.
#import "theme.typ": *

#show: cv.with(
  font-type: body-font,
  continue-header: "false",
  name: "Felipe Saracho",
  address: "Buenos Aires, Argentina",
  lastupdated: "true",
  pagecount: "true",
  date: "2026-08-26",
  contacts: (
    (text: "LinkedIn", link: "https://www.linkedin.com/in/felipe-saracho/"),
    (text: "Github", link: "https://github.com/FelipeS02"),
    (text: "fsaracho.dev", link: "https://fsaracho.dev"),
    (text: "felipesaracho02@gmail.com", link: "mailto:felipesaracho02@gmail.com"),
  ),
)

// about
#section[About Me]
#descript[Product-minded Front-End engineer specialized in React, Next.js and TypeScript, with 3+ years building web products and SaaS for fintech, insurance and corporate clients. I set design systems and technical standards that outlive my involvement, and work across the stack into serverless backends.]

#sectionsep
// Experience
#section("Experience")

#job(
  position: "Front-End Developer",
  institution: [IT ROCK],
  location: "Argentina",
  date: "Mar 2025 – Present",
  description: [
    - Defined the Design System and technical standards (Tailwind CSS, Zod, shadcn/ui) for one project; they were adopted as the company standard across 5 Next.js projects, 2 of them shipped by teams I never worked with.

    - Part of the company's internal AI lab, where we built an agent-driven test generation workflow: it walks an existing codebase, extracts the functionality actually implemented, and derives the test suite from it — bringing coverage to projects that had shipped with none.

    - Delivered features through an AI-assisted workflow with Claude Code, with Jira tickets authored as Spec-Driven Development specs — each card carrying the requirements the agent implements against, instead of ad-hoc prompting.

    - Built critical features for financial and corporate platforms — document management, subscriptions and online booking — with Azure AD (MSAL) authentication and Stripe/PayPal payment integrations.

    - Built and maintained serverless pipelines on AWS Lambda with SQS queues for media processing(Python + FFmpeg) and document generation.
  ],
)

#job(
  position: "Full-Stack Developer",
  institution: [AndesIA],
  location: "Argentina",
  date: "Jan – Jun 2025",
  description: [
    - Designed and built the entire frontend of LICAUT, a SaaS platform automating windshield replacement tenders for insurance companies, and implemented from scratch the async queue system (BullMQ + Redis) orchestrating tender scraping and document submission — cutting processing time per tender from 5–8 minutes to 30–40 seconds.

    - The product was commercialized to Todo Parabrisas — a client for whom I also built the corporate landing page — and runs in production, processing 200–300 tenders a month with peaks of up to 500.
  ],
)

#job(
  position: "Front-End Developer",
  institution: [LILAB],
  location: "Argentina",
  date: "Nov 2021 – Mar 2023 · Dec 2023 – Jun 2024",
  description: [
    - Led end-to-end development of the invoice factoring flow for Progreso, a CMF-regulated Chilean non-bank lender: first integrated into its existing portal and, after being brought back, as a full standalone application for Temba, its digital brand, where I also owned the UX/UI design.

    - Turned onboarding into self-service: the SME signs up, pulls its invoices from the SII (Chilean tax authority), gets an automated quote of the advance, and submits the request itself. Before, an executive did all of it by hand, client by client.

    - Moved the back office from phone-tracked operations to a database-backed state machine: segmented by originating channel (Progreso and Temba), each carrying its scoring and amount, and every approval stage advanced by a single action.

    - Built the team's first design system and Figma workflow, based on TypeScript, Atomic Design and SOLID.
  ],
)

#sectionsep
#section("Skills")
#oneline-title-item(
  title: "Skills",
  content: [TypeScript, JavaScript, React, Next.js, Astro, Node.js, NestJS, PostgreSQL, Redis, AWS],
)
#oneline-title-item(
  title: "English",
  content: [B2 general, C2 reading and listening (EF SET 72/100)],
)

#sectionsep
#section("Projects")
#project(
  title: [Mindtú],
  date: [2026],
  description: [Web platform for an audiovisual production company and creator academy — corporate site plus academy section with separate funnels for two audiences. Built end-to-end with Next.js 16 and React 19.]
)
// The template's project() emits no trailing linebreak, so without this the
// next entry's title runs on at the end of the description above.
#linebreak()
#project(
  title: [AYEMAG],
  date: [2025],
  description: [Commercial landing page and validated lead-generation flow for an industrial flexible container manufacturer, built with Astro and React.]
)

#sectionsep
#section("Education")
#education(
  institution: [Henry],
  major: [Full-Stack Web Development],
  date: "2021",
  location: "Argentina",
)

#set document(author: "Felipe Saracho", title: "Felipe Saracho — CV")
