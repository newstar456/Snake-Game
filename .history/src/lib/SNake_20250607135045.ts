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
  }

  move() {
    const head = this.segments[0];
    console.log(this.movementHistory);
    const newHead = new SnakeSegment(head.x, head.y, 'head', this.direction);

    switch (this.direction) {
      case 'left': newHead.x -= 1; break;
      case 'right': newHead.x += 1; break;
      case 'up': newHead.y -= 1; break;
      case 'down': newHead.y += 1; break;
    }
    this.movementHistory.unshift({ ...newHead });
    this.segments.forEach((segment, i) => {
      const historyIndex = i;
      if (this.movementHistory[historyIndex]) {
        if (segment.type === 'tail') {
          segment.lastTailPosition = { x: segment.x, y: segment.y };
        }
        segment.x = this.movementHistory[historyIndex].x;
        segment.y = this.movementHistory[historyIndex].y;
      }
    });
    console.log(this.segments);
    head.x = newHead.x;
    head.y = newHead.y;
    // if (this.movementHistory.length > this.segments.length + 1) {
    //   this.movementHistory.pop();
    // }
    this.movementHistory.pop();
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
