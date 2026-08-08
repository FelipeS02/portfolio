import { FC, HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

/**
 * Distance between two long ticks. The strip is rendered one tile wider on each
 * side of its container, so wrapping `x` inside `[0, TILE)` keeps it covering
 * the full width no matter which way it travels.
 */
export const CLOCK_LINES_TILE = 200;

const TILE_HEIGHT = 30;
/** Horizontal fade at both ends, replacing react-fast-marquee's `gradient` */
const FADE_WIDTH = 200;
const LONG_TICK_LENGTH = 25;
const SHORT_TICK_LENGTH = 20;
const LONG_TICK_X = 1.25;

// 20.75, 40.75 ... 180.75 — 180.75 to the next tile's 201.25 is another 20.5,
// so the spacing stays even across the seam
const SHORT_TICKS_X = Array.from(
  { length: 9 },
  (_, index) => LONG_TICK_X + 19.5 + index * 20,
);

// Masking instead of overlaying a background-colored gradient keeps the fade
// correct whatever sits behind the section
const FADE_MASK = `linear-gradient(to right, transparent, #000 ${FADE_WIDTH}px, #000 calc(100% - ${FADE_WIDTH}px), transparent)`;

type ClockLinesProps = {
  side?: 'top' | 'bottom';
} & HTMLAttributes<HTMLDivElement>;

const ClockLines = ({
  side = 'top',
  style,
  className,
  ...props
}: ClockLinesProps) => {
  const patternId = `clock-ticks-${side}`;

  // Ticks hang from the top edge, or grow up from the bottom one. Doing it with
  // coordinates instead of a rotate class leaves the transform free for GSAP.
  const tick = (length: number) =>
    side === 'bottom'
      ? { y1: TILE_HEIGHT, y2: TILE_HEIGHT - length }
      : { y1: 0, y2: length };

  return (
    <div
      className={cn('clock-lines z-0 w-full overflow-hidden', className)}
      style={{ ...style, maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
      {...props}
    >
      <svg
        className={cn(
          'clock-lines-track stroke-foreground-secondary block opacity-50',
          // Mobile's scroll ride is too short for GSAP's scrub to read well,
          // so it keeps the old marquee-style constant crawl instead
          side === 'bottom'
            ? 'max-md:animate-clock-ticks-right'
            : 'max-md:animate-clock-ticks-left',
        )}
        style={{
          width: `calc(100% + ${CLOCK_LINES_TILE * 2}px)`,
          marginLeft: `-${CLOCK_LINES_TILE}px`,
        }}
        height={TILE_HEIGHT}
        aria-hidden
      >
        <defs>
          {/* No viewBox on the svg, so user space is CSS pixels */}
          <pattern
            id={patternId}
            width={CLOCK_LINES_TILE}
            height={TILE_HEIGHT}
            patternUnits='userSpaceOnUse'
          >
            <line
              x1={LONG_TICK_X}
              x2={LONG_TICK_X}
              strokeWidth='2.5'
              {...tick(LONG_TICK_LENGTH)}
            />
            {SHORT_TICKS_X.map((x) => (
              <line
                key={x}
                x1={x}
                x2={x}
                strokeWidth='1.5'
                {...tick(SHORT_TICK_LENGTH)}
              />
            ))}
          </pattern>
        </defs>
        {/* stroke is inherited in SVG, so without this the rect outlines itself */}
        <rect
          width='100%'
          height={TILE_HEIGHT}
          fill={`url(#${patternId})`}
          stroke='none'
        />
      </svg>
    </div>
  );
};

export default ClockLines;
