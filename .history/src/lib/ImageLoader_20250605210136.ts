const images: Record<string, HTMLImageElement> = {};

export function preloadImage(src: string) {
  if (images[src]) return images[src];

  const img = new Image();
  img.src = src;
  images[src] = img;
  return img;
}

export function getImage(src: string): HTMLImageElement | undefined {
  return images[src];
}
