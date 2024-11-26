import { useEffect } from 'react';

export function useImageLoading(src: string, callback: (res: boolean) => void) {
  useEffect(() => {
    if (!src) return;

    // Verify theme image loading state
    const img = new Image();
    img.src = src;

    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
}
