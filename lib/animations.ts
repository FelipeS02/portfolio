import { MutableRefObject } from 'react';

import gsap from 'gsap';

/**
 *
 * @param tlRef timeline ref
 * @param vars timeline options
 * @returns Persisted timeline across effect updates
 */
export function persistedTimeline(
  tlRef: MutableRefObject<GSAPTimeline | null>,
  vars: GSAPTimelineVars = {},
): GSAPTimeline {
  if (!tlRef) throw new Error('Timeline is not defined');

  let timeline = tlRef.current;

  if (!timeline) {
    const newTimeline = gsap.timeline(vars);

    tlRef.current = newTimeline;
    timeline = newTimeline;
  }

  return timeline;
}
