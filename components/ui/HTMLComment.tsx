import { FC } from 'react';

const HTMLComment: FC<{ text: string }> = ({ text }) => {
  return <span dangerouslySetInnerHTML={{ __html: `<!-- ${text} -->` }} />;
};

export default HTMLComment;
