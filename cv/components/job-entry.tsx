import { Job } from '../content/types';

export function JobEntry({ job, stackLabel }: { job: Job; stackLabel: string }) {
  return (
    <div className="mb-[22px] break-inside-avoid last:mb-0">
      <h3 className="m-0 text-lg font-semibold font-neue">
        {job.role} / <span className="font-bold text-(--cv-text) italic">{job.company}</span>
      </h3>
      <p className="m-0 mt-0.5 font-neue mb-2 text-sm tracking-wide leading-none normal-case text-(--cv-muted) italic">
        {job.dateRanges.join(' · ')}
      </p>
      <ul className="m-0 mb-2 list-disc pl-5">
        {job.bullets.map((bullet, i) => (
          <li key={i} className="mb-1.5 max-w-[58ch] font-light tracking-wide last:mb-0">
            {bullet}
          </li>
        ))}
      </ul>
      <p className="m-0 text-[0.82rem] text-(--cv-muted) normal-case">
        <b className="font-medium text-(--cv-text)">{stackLabel}</b> {job.stack.join(' / ')}
      </p>
    </div>
  );
}
