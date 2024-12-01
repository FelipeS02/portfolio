import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

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
      'absolute size-3 bg-white border border-inherit opacity-0 group-data-[selected=true]:opacity-100',
      className
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
        'relative data-[selected=true]:border-2 border-[#0C8CE9] group',
        className
      )}
      data-selected={selected}
      id={id}
    >
      <SelectableElementSquare className='-top-2 -left-2' />
      <SelectableElementSquare className='-top-2 -right-2' />
      <SelectableElementSquare className='-bottom-2 -left-2' />
      <SelectableElementSquare className='-bottom-2 -right-2' />
      {children}
    </div>
  );
};

export default SelectableElement;
