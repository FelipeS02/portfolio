import { Fragment } from 'react';

export function SplittedWord({ children: word }: { children: string }) {
  if (!word) return null;
  const splittedWord = word.split('');
  return (
    <span className='word inline-block mb-[-0.1em] pb-[0.1em]' data-word={word}>
      {splittedWord.map((char, index) => (
        <span className='char inline-block' key={`${word}-${char}-${index}`}>
          {char}
        </span>
      ))}
    </span>
  );
}

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
