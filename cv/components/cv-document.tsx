import { CvContent } from '../content/types';
import { Header } from './header';
import { JobEntry } from './job-entry';
import { Section } from './section';
import { SkillGroupEntry } from './skill-group-entry';

/** Body content only — the HTML/head shell and theme CSS vars are assembled by generate.tsx. */
export function CvDocument({ content }: { content: CvContent }) {
  return (
    <div className="cv-page-pad">
      <Header content={content} />
      <main className="mx-auto max-w-[800px] px-10">
        <div className="grid grid-cols-[auto_1fr] items-start gap-x-7 gap-y-5">
          <Section label={content.labels.about}>
            <p className="m-0 max-w-[58ch] font-light tracking-wide normal-case">{content.about}</p>
          </Section>

          <Section label={content.labels.experience}>
            {content.experience.map((job) => (
              <JobEntry
                key={`${job.company}-${job.dateRanges[0]}`}
                job={job}
                stackLabel={content.labels.stack}
              />
            ))}
          </Section>

          <Section label={content.labels.skills}>
            {content.skills.map((group) => (
              <SkillGroupEntry key={group.title} group={group} />
            ))}
          </Section>

          <Section label={content.labels.education}>
            {content.education.map((edu) => (
              <div key={edu.title} className="mb-2 last:mb-0">
                <p className="m-0 mb-0.5 font-medium">{edu.title}</p>
                <p className="m-0 text-[0.85rem] text-(--cv-muted) italic">{edu.date}</p>
              </div>
            ))}
          </Section>

          <Section label={content.labels.certifications}>
            {content.certifications.map((cert) => (
              <p key={cert} className="m-0 mb-1.5 normal-case last:mb-0">
                {cert}
              </p>
            ))}
          </Section>
        </div>
      </main>
    </div>
  );
}
