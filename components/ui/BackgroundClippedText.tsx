import { cn } from '@/lib/utils';
import { FC, PropsWithChildren } from 'react';

type HtmlTextTag =
  | 'a' // Link
  | 'abbr' // Abbreviation
  | 'b' // Bold text
  | 'bdi' // Bidirectional isolation
  | 'bdo' // Bidirectional override
  | 'blockquote' // Block quotation
  | 'br' // Line break
  | 'cite' // Citation
  | 'code' // Inline code
  | 'data' // Data
  | 'dd' // Description list definition
  | 'del' // Deleted text
  | 'dfn' // Definition
  | 'dt' // Description list term
  | 'em' // Emphasis
  | 'h1' // Heading 1
  | 'h2' // Heading 2
  | 'h3' // Heading 3
  | 'h4' // Heading 4
  | 'h5' // Heading 5
  | 'h6' // Heading 6
  | 'i' // Italic text
  | 'ins' // Inserted text
  | 'kbd' // Keyboard input
  | 'mark' // Marked text
  | 'p' // Paragraph
  | 'pre' // Preformatted text
  | 'q' // Quotation
  | 's' // Strikethrough text
  | 'samp' // Sample output
  | 'small' // Smaller text
  | 'span' // Generic inline container
  | 'strong' // Strong emphasis
  | 'sub' // Subscript
  | 'sup' // Superscript
  | 'time' // Date/time
  | 'u' // Underlined text
  | 'var' // Variable
  | 'wbr'; // Word break

export type BackgroundClippedTextProps = PropsWithChildren<{
  className?: string;
  as?: HtmlTextTag;
}>;

const BackgroundClippedText: FC<BackgroundClippedTextProps> = ({
  as = 'span',
  className = '',
  children,
}) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        'bg-foreground bg-cover bg-theme bg-clip-text bg-center text-transparent',
        className
      )}
    >
      {children}
    </Comp>
  );
};

export default BackgroundClippedText;
