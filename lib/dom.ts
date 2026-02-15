import { Palette } from '@/models/theme';

export function getRootElement(): HTMLElement {
  const root = document.documentElement;

  if (!root) throw new Error('Root element not exists');

  return root;
}

export function applyPaletteIntoCSS(palette: Palette['hsl']): void {
  if (!palette) throw new Error('Palette is not defined');

  const root = getRootElement();

  Object.entries(palette).forEach(([shade, color]) => {
    root.style.setProperty(`--palette-${shade}`, color);
  });
}

export function applyThemeImage(imageSrc: string): void {
  if (!imageSrc) throw new Error('Image src is not defined');

  const root = getRootElement();

  root.style.setProperty('--theme-image', `url(${imageSrc})`);
}

export function getRelativeXY(container: HTMLElement, target: HTMLElement) {
  if (!container || !target) throw Error("Container or Target doesn't exists");

  // Get viewport coords
  const { left: containerLeft, top: containerTop } =
    container.getBoundingClientRect();

  const targetRect = target.getBoundingClientRect();
  const { left: targetLeft, top: targetTop } = targetRect;

  // Calc coords relative to container element
  const x = targetLeft - containerLeft;
  const y = targetTop - containerTop;

  return { x, y, targetRect };
}

export function mediaQueryMatches(query: string) {
  if (typeof window === 'undefined' || !query) return false;

  return window.matchMedia(query).matches;
}

export function isSafariAgent(): boolean {
  return (
    Boolean(navigator.vendor) &&
    navigator.vendor.indexOf('Apple') > -1 &&
    Boolean(navigator.userAgent) &&
    navigator.userAgent.indexOf('CriOS') === -1 &&
    navigator.userAgent.indexOf('FxiOS') === -1
  );
}

export function isFirefoxAgent(): boolean {
  return (
    Boolean(navigator.userAgent) && navigator.userAgent.indexOf('Firefox') > -1
  );
}

export const updateFavicon = (color: string) => {
  const canvas = document.createElement('canvas');
  canvas.width = 32; // Common favicon size
  canvas.height = 32;
  const ctx = canvas.getContext('2d');

  if (!ctx) throw new Error('Context not found');

  // Create a colored square (or draw a shape/logo if desired)
  ctx.fillStyle = `#${color}`;
  ctx.fillRect(0, 0, 32, 32);

  // Convert canvas to a data URL and update the favicon link
  const link = document.getElementById('favicon-link') as HTMLLinkElement;
  if (link && link instanceof HTMLLinkElement)
    link.href = canvas.toDataURL('image/png');
};

/**
 * Returns an optimal pixel ratio for rendering based on device capabilities.
 * @param scale - Extra multiplier on top of the device pixel ratio (default: 1)
 * @param max - Maximum pixel ratio cap (default: 3)
 */
export function getOptimalPixelRatio(scale = 1, max = 3): number {
  const dpr = window.devicePixelRatio ?? 1;

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const isMobile = mediaQueryMatches('(max-width: 768px)');

  let tier: number;

  if (isMobile || cores <= 2 || (memory !== undefined && memory <= 2)) {
    // Low-end: cap at 1x DPR, ignore extra scale
    tier = 1;
  } else if (cores <= 4 || (memory !== undefined && memory <= 4)) {
    // Mid-range: apply half the requested scale
    tier = dpr * (1 + (scale - 1) * 0.5);
  } else {
    // High-end: apply full scale
    tier = dpr * scale;
  }

  return Math.min(tier, max);
}
