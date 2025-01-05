import { useEffect, useState } from 'react';

export default function useVisibilityChecker(
  target: Element,
  options?: IntersectionObserverInit,
) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      {
        // no margin
        root: null,
        // no margin
        rootMargin: '0px',
        // 50% of target visible
        threshold: 0.5,
        ...options,
      },
    );

    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [target, options]);

  return isVisible;
}
