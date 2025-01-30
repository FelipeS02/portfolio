import { FC, Fragment, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

export type SplittedWordProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  'children'
> & {
  children: string;
  className?: string;
};

export const SplittedWord: FC<SplittedWordProps> = ({
  children: word,
  className = '',
  ...rest
}) => {
  if (!word) return null;

  const splittedWord = word.split('');

  return (
    <span
      className={cn(
        'word mb-[-0.1em] inline-block pb-[0.1em] text-inherit',
        className,
      )}
      data-word={word}
      aria-label={word}
      {...rest}
    >
      {splittedWord.map((char, index) => (
        <span className='char inline-block' key={`${word}-${index}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export function SplittedText({ children: text }: { children: string }) {
  if (!text) return null;

  const splittedText = text.split(' ');

  return (
    <>
      {splittedText.map((word, index) => (
        <Fragment key={`${word}-splitted-${index}`}>
          <SplittedWord>{word}</SplittedWord>
          {/* Add space between words */}
          {index < splittedText.length - 1 && ' '}
        </Fragment>
      ))}
    </>
  );
}
