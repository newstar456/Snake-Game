const images: Record<string, HTMLImageElement> = {};
const imagePromises: { [key: string]: Promise<HTMLImageElement> | undefined } = {};
const imageCache: Record<string, HTMLImageElement> = {};

export function preloadImage(src: string):Promise<HTMLImageElement>  {

  if (images[src]) return Promise.resolve(images[src]);
  if (imagePromises[src]) return imagePromises[src];

  const img = new Image();
  const promise = new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => {
      images[src] = img;
      resolve(img);
    };
    img.onerror = reject;
  });

  img.src = src;
  imagePromises[src] = promise;
  return promise;

}

export function getImage(src: string): HTMLImageElement | undefined {
  return images[src];
}
