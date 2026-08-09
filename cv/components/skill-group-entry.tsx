import { SkillGroup } from '../content/types';

export function SkillGroupEntry({ group }: { group: SkillGroup }) {
  return (
    <div className='mb-4 last:mb-0'>
      <h3 className='m-0 mb-1.5 text-[0.82rem] font-medium tracking-wide uppercase'>
        {group.title}
      </h3>
      {group.entries.map((entry, i) => (
        <p
          key={i}
          className='m-0 mb-0.5 text-[0.78rem] tracking-wide normal-case last:mb-0'
        >
          {entry.level ? (
            <>
              <span className='text-(--cv-muted) uppercase'>
                {entry.level}:
              </span>{' '}
              <b className='text-[0.95rem] font-normal tracking-normal text-(--cv-text) normal-case'>
                {entry.items}
              </b>
            </>
          ) : (
            entry.items
          )}
        </p>
      ))}
    </div>
  );
}
