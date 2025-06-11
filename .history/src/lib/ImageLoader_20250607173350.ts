const images: Record<string, HTMLImageElement> = {};
const imagePromises: { [key: string]: Promise<HTMLImageElement> | undefined } = {};


export function preloadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    if (imageCache[src]) {
      resolve(imageCache[src]);
      return;
    }

    const img = new Image();
    img.src = src;
    img.onload = () => {
      imageCache[src] = img;
      resolve(img);
    };
    img.onerror = reject;
  });
}

export function getImage(src: string): HTMLImageElement | undefined {
  return images[src];
}
