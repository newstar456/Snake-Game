import { preloadImage, getImage } from './ImageLoader';
export type SegmentType = 'head' | 'body' | 'tail';

export default class SnakeSegment {
  x: number;
  y: number;
  type: SegmentType;
  direction: 'up' | 'down' | 'left' | 'right';
  lastTailPosition?: { x: number; y: number };
  image?: HTMLImageElement;

  constructor(x: number, y: number, type: SegmentType, direction: 'up' | 'down' | 'left' | 'right') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
    this.lastTailPosition = { x, y };
  }

  getImageSrc():string{
    if (this.type === 'body') return '/assets/snake/body.png';
    return `/assets/snake/${this.type}-${this.direction}.png`;
  }

  async draw(ctx: CanvasRenderingContext2D, size: number) {
    const src = await this.getImageSrc();
    const img = await preloadImage(src);
    ctx.drawImage(img, this.x * size, this.y * size, size, size);
  }
}
