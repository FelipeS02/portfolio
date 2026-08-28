#import "@preview/silver-dev-cv:1.0.2": *
// Overrides the template's cv/section/job/education/project helpers so they
// use the display font and the themed palette; must come after the package
// import to shadow it.
#import "theme.typ": *

#set text(lang: "es")
// The template hardcodes the English footer label; rewrite it at render time.
#show "Last updated:": "Última actualización:"

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
#section[Sobre mí]
#descript[Desarrollador Front-End con visión de producto, especializado en React, Next.js y TypeScript, con más de 3 años construyendo productos web y SaaS para clientes de fintech, seguros y corporativos. Defino design systems y estándares técnicos que sobreviven a mi participación en el proyecto, y trabajo a lo largo del stack hasta backends serverless.]

#sectionsep
// Experience
#section("Experiencia")

#job(
  position: "Desarrollador Front-End",
  institution: [IT ROCK],
  location: "Argentina",
  date: "Mar 2025 – Presente",
  description: [
    - Definí el Design System y los estándares técnicos (Tailwind CSS, Zod, shadcn/ui) que se adoptaron como estándar de la empresa en 5 proyectos Next.js, 2 de ellos ajenos a mi participación.

    - Participé en el laboratorio interno de I+D, automatizando con agentes la generación de casos de prueba en proyectos con deuda técnica.

    - Entregué funcionalidades con Claude Code bajo un flujo Spec-Driven Development integrado con Jira.

    - Construí funcionalidades de gestión documental, suscripciones y reservas online para plataformas financieras y corporativas, con autenticación Azure AD (MSAL) y pagos con Stripe y PayPal.

    - Construí pipelines serverless en AWS Lambda con colas SQS para procesamiento de medios (Python + FFmpeg) y generación de documentos.
  ],
)

#job(
  position: "Desarrollador Full-Stack",
  institution: [AndesIA],
  location: "Argentina",
  date: "Ene – Jun 2025",
  description: [
    - Diseñé y construí todo el frontend de LICAUT, una plataforma SaaS que automatiza las licitaciones de reemplazo de parabrisas para compañías de seguros, e implementé desde cero el sistema de colas asíncronas (BullMQ + Redis) que orquesta el scraping de licitaciones y el envío de documentación. El tiempo de procesamiento por licitación bajó de 5–8 minutos a 30–40 segundos, alrededor de un 90% menos.

    - El producto fue comercializado a Todo Parabrisas, cliente para el que además construí la landing page corporativa. Está en producción, procesando entre 200 y 300 licitaciones por mes con picos de hasta 500.
  ],
)

#job(
  position: "Desarrollador Front-End",
  institution: [LILAB],
  location: "Argentina",
  date: "Dic 2023 – Jun 2024",
  description: [
    - Tras ser reconvocado, construí Temba, la marca digital de Progreso, como aplicación standalone: el producto de factoring completo de punta a punta, en lugar de un flujo embebido en el portal de otro.

    - Estuve a cargo del diseño UX/UI del producto además de su implementación front-end.
  ],
)

#job(
  position: "Desarrollador Front-End",
  institution: [LILAB],
  location: "Argentina",
  date: "Nov 2021 – Mar 2023",
  description: [
    - Lideré el desarrollo end-to-end del flujo de factoring de facturas de Progreso, financiera no bancaria chilena regulada por la CMF, integrado en su portal de clientes existente.

    - Convertí el onboarding de manual a autogestión, integrando scoring automático e importación de facturas desde el SII (autoridad tributaria chilena).

    - Transformé el traspaso de operaciones entre ejecutivos, de un seguimiento telefónico manual a una máquina de estados en base de datos.

    - Construí el primer design system y flujo de trabajo en Figma del equipo, basado en TypeScript, Atomic Design y SOLID.
  ],
)

#sectionsep
#section("Habilidades")
#oneline-title-item(
  title: "Tecnologías",
  content: [TypeScript, JavaScript, React, Next.js, Astro, Node.js, NestJS, PostgreSQL, Redis, AWS],
)
#oneline-title-item(
  title: "Inglés",
  content: [B2 general, C2 en lectura y comprensión auditiva],
)

#sectionsep
#section("Proyectos")
#project(
  title: [Mindtú],
  date: [2026],
  description: [Plataforma web para una productora audiovisual y academia de creadores: sitio corporativo más sección de academia con embudos separados para dos audiencias. Construida de punta a punta con Next.js 16 y React 19.],
)
// The template's project() emits no trailing linebreak, so without this the
// next entry's title runs on at the end of the description above.
#linebreak()
#project(
  title: [AYEMAG],
  date: [2025],
  description: [Landing page comercial y flujo validado de generación de leads para un fabricante de contenedores flexibles industriales, construida con Astro y React.],
)

#sectionsep
#section("Educación")
#education(
  institution: [Henry],
  major: [Desarrollo Web Full-Stack],
  date: "2021",
  location: "Argentina",
)

#set document(author: "Felipe Saracho", title: "Felipe Saracho CV")
