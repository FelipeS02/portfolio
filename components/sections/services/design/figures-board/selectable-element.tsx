import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

type Props = PropsWithChildren<{
  className?: string;
  id: string;
  selected?: boolean;
}>;

export const SelectableElementSquare = ({
  className = '',
}: {
  className?: string;
}) => (
  <div
    className={cn(
      'absolute size-3 border border-inherit bg-white opacity-0 group-data-[selected=true]:opacity-100',
      className,
    )}
  />
);

const SelectableElement: FC<Props> = ({
  id,
  children,
  selected,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative border-[#0C8CE9] data-[selected=true]:border-2',
        className,
      )}
      data-selected={selected}
      id={id}
    >
      <SelectableElementSquare className='-left-2 -top-2' />
      <SelectableElementSquare className='-right-2 -top-2' />
      <SelectableElementSquare className='-bottom-2 -left-2' />
      <SelectableElementSquare className='-bottom-2 -right-2' />
      {children}
    </div>
  );
};

export default SelectableElement;
