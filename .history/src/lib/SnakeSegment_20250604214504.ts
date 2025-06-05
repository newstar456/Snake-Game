export type SegmentType = 'head' | 'body' | 'tail';

export default class SnakeSegment {
  x: number;
  y: number;
  type: SegmentType;
  lastTailPosition: { x: number; y: number };
  direction: 'up' | 'down' | 'left' | 'right';

  constructor(x: number, y: number, type: SegmentType, direction: 'up' | 'down' | 'left' | 'right') {
    this.x = x;
    this.y = y;
    this.type = type;
    this.direction = direction;
    this.lastTailPosition = { x, y };
  }

  draw(ctx: CanvasRenderingContext2D, size: number) {
    switch (this.type) {
      case 'head':
        ctx.fillStyle = 'green';
        break;
      case 'body':
        ctx.fillStyle = 'lime';
        break;
      case 'tail':
        ctx.fillStyle = 'darkgreen';
        break;
    }

    ctx.fillRect(this.x * size, this.y * size, size, size);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(this.x * size, this.y * size, size, size);
  }
}
