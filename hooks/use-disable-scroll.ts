import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export default function useDisableScroll(): [
  boolean,
  Dispatch<SetStateAction<boolean>>,
] {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (disabled) {
      document.body.style.overflow = 'hidden'; // standard no-scroll implementation
      document.body.setAttribute('data-lenis-prevent', 'true'); // Make sure you pass true as string

      return;
    }

    document.body.style.overflow = 'auto';
    document.body.removeAttribute('data-lenis-prevent');
  }, [disabled]);

  return [disabled, setDisabled];
}
