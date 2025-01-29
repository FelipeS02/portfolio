import { Palette } from '@/models/theme';

export function getRootElement(): HTMLElement {
  const root = document.documentElement;

  if (!root) throw new Error('Root element not exists (?)');

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
