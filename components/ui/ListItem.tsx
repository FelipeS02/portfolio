import { cn } from "@/lib/utils";

const ListItem = ({
  name,
  className = '',
}: {
  name: string;
  className?: string;
}) => {
  return (
    <li
      className={cn(
        'last-of-type:border-0 first-of-type:border-t-2 border-b-2 border-palette-600 py-8 text-6xl lg:text-8xl font-neue text-pretty',
        className
      )}
    >
      <h6>{name}</h6>
    </li>
  );
};

export { ListItem };
