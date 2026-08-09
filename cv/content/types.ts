export type Locale = 'es' | 'en';

export type Job = {
  role: React.ReactNode;
  company: React.ReactNode;
  /** Rendered joined by "·" so a single entry can hold discontinuous periods. */
  dateRanges: React.ReactNode[];
  bullets: React.ReactNode[];
  stack: React.ReactNode[];
};

export type SkillGroup = {
  title: string;
  /** Rendered as "<level>: <items>" when a level is present. */
  entries: { level?: string; items: string }[];
};

export type CvContent = {
  locale: Locale;
  name: string;
  role: string;
  contact: { label: string; href: string }[];
  labels: {
    about: string;
    experience: string;
    skills: string;
    education: string;
    certifications: string;
    stack: string;
  };
  about: string;
  experience: Job[];
  skills: SkillGroup[];
  education: { title: string; date: string }[];
  certifications: string[];
};
