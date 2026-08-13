import { ReactNode } from 'react';

/** A CV grid row: label cell + content cell, as grid-auto-placed siblings. */
export function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <div className="font-neue text-right text-[1.25rem] font-medium uppercase">
        {label}
      </div>
      <div>{children}</div>
    </>
  );
}
