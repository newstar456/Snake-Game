import SnakeSegment from './SnakeSegment';

export default class Snake {
  segments: SnakeSegment[] = [];
  direction: 'up' | 'down' | 'left' | 'right' = 'left';
  cellSize: number;

  constructor(startX: number, startY: number, cellSize: number) {
    this.cellSize = cellSize;

    for (let i = 0; i < 5; i++) {
      const type = i === 0 ? 'head' : (i === 4 ? 'tail' : 'body');
      const segment = new SnakeSegment(startX + i, startY, type, this.direction);
      this.segments.push(segment);
    }
  }

  move() {
    const head = this.segments[0];
    const newHead = new SnakeSegment(head.x, head.y, 'head', this.direction);

    switch (this.direction) {
      case 'up':
        newHead.y -= 1;
        break;
      case 'down':
        newHead.y += 1;
        break;
      case 'left':
        newHead.x -= 1;
        break;
      case 'right':
        newHead.x += 1;
        break;
    }

    // Update current head to body
    this.segments[0].type = 'body';

    // Save last tail position
    const tail = this.segments[this.segments.length - 1];
    tail.lastTailPosition = { x: tail.x, y: tail.y };

    // Remove tail, insert new head
    this.segments.pop();
    this.segments.unshift(newHead);

    // Update tail marker
    this.segments[this.segments.length - 1].type = 'tail';
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx, this.cellSize);
    }
  }

  setDirection(newDirection: 'up' | 'down' | 'left' | 'right') {
    // Prevent reversal
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
