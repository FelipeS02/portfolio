import { Palette } from "@/models/theme";

export function getRootElement(): HTMLElement {
  const root = document.documentElement;

  if (!root) throw new Error('Root element not exists (?)');

  return root;
}

export function applyPaletteIntoCSS(palette: Palette): void {
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
