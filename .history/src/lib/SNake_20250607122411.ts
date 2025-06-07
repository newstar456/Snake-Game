import SnakeSegment from './SnakeSegment';

export default class Snake {

  segments: SnakeSegment[] = [];
  movementHistory: { x: number; y: number }[] = [];
  direction: 'up' | 'down' | 'left' | 'right' = 'left';
  cellSize: number;

  constructor(startX: number, startY: number, cellSize: number, initialDirection: 'left' | 'right' | 'up' | 'down') {
    this.cellSize = cellSize;

    for (let i = 0; i < 5; i++) {
      const type = i === 0 ? 'head' : (i === 4 ? 'tail' : 'body');
      const segment = new SnakeSegment(startX + i, startY, type, this.direction);
      this.segments.push(segment);
      this.movementHistory.push({ x: startX + i, y: startY });
    }
    // console.log(this.movementHistory);
  }

  move() {
    const head = this.segments[0];
    const newHead = new SnakeSegment(head.x, head.y, 'head', this.direction);

    switch (this.direction) {
      case 'left': newHead.x -= 1; break;
      case 'right': newHead.x += 1; break;
      case 'up': newHead.y -= 1; break;
      case 'down': newHead.y += 1; break;
    }

    this.segments[0].type = 'body';

    const tail = this.segments[this.segments.length - 1];
    tail.lastTailPosition = { x: tail.x, y: tail.y };

    this.segments.pop();
    this.segments.unshift(newHead);

    this.segments[this.segments.length - 1].type = 'tail';
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx, this.cellSize);
    }
  }

  setDirection(newDirection: 'up' | 'down' | 'left' | 'right') {
    if (
      (this.direction === 'left' && newDirection === 'right') ||
      (this.direction === 'right' && newDirection === 'left') ||
      (this.direction === 'up' && newDirection === 'down') ||
      (this.direction === 'down' && newDirection === 'up')
    ) {
      return;
    }
    this.direction = newDirection;
  }
}
