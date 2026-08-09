import { CvContent } from '../content/types';

export function Header({ content }: { content: CvContent }) {
  return (
    <header className="mx-auto mb-4 max-w-[800px] px-10">
      <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
        <div>
          <h1 className="font-neue m-0 text-[1.5rem] leading-none font-bold uppercase">
            {content.name}
          </h1>
          <p className="m-0 text-[1.25rem] font-medium text-(--cv-muted) uppercase">
            {content.role}
          </p>
        </div>
        <div className="text-right text-xs leading-normal font-medium tracking-wide">
          {content.contact.map((c) => (
            <div key={c.label} className="whitespace-nowrap uppercase">
              <a href={c.href} className="text-(--cv-text) font-medium no-underline">
                {c.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
