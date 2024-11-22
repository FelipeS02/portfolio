const SplittedText = ({ word }: { word: string }) => {
  if (!word) return null;
  const splittedWord = word.split('');
  return (
    <span className='word inline-block'>
      {splittedWord.map((char, index) => (
        <span className='char inline-block' key={`word-${char}-${index}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default SplittedText;
