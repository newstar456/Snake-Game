const images: Record<string, HTMLImageElement> = {};
const imagePromises: Record<string, Promise<HTMLImageElement>> = {};

export function preloadImage(src: string):Promise<HTMLImageElement>  {
  
  if (images[src]) return Promise.resolve(images[src]);
  if (imagePromises[src]) return imagePromises[src];

  const img = new Image();
  img.src = src;
  images[src] = img;
  return img;
}

export function getImage(src: string): HTMLImageElement | undefined {
  return images[src];
}
