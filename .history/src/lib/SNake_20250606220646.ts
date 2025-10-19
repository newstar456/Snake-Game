import SnakeSegment from './SnakeSegment';

export default class Snake {
  segments: SnakeSegment[] = [];
  movementHistory: { x: number; y: number }[] = [];
  direction: 'up' | 'down' | 'left' | 'right' = 'left';
  cellSize: number;

  constructor(startX: number, startY: number, cellSize: number) {
    this.cellSize = cellSize;
    // this.direction = initialDirection;

    for (let i = 0; i < 5; i++) {
      const type = i === 0 ? 'head' : (i === 4 ? 'tail' : 'body');
      const segment = new SnakeSegment(startX + i, startY, type, this.direction);
      this.segments.push(segment);
    }
    for (let i = 0; i < this.segments.length; i++) {
      this.movementHistory.push({ x: startX, y: startY });
    }
    console.log(this.movementHistory);
  }

  move() {
    const head = this.segments[0];
    const newHead = new SnakeSegment(head.x, head.y, 'head', this.direction);

    switch (this.direction) {
      case 'up': newHead.y -= 1; break;
      case 'down': newHead.y += 1; break; 
      case 'left': newHead.x -= 1; break; 
      case 'right': newHead.x += 1; break;
    }

    this.movementHistory.unshift({ ...newHead });
    this.segments[0].type = 'body';
    this.segments.forEach((segment, i) => {
      const historyIndex = i + 1;
      if (this.movementHistory[historyIndex]) {
        if (segment.type === 'tail') {
          segment.lastTailPosition = { x: segment.x, y: segment.y };
        }
        segment.x = this.movementHistory[historyIndex].x;
        segment.y = this.movementHistory[historyIndex].y;
      }
    });
    head.x = newHead.x;
    head.y = newHead.y;
    if (this.movementHistory.length > this.segments.length + 1) {
      this.movementHistory.pop();
    }
    // const tail = this.segments[this.segments.length - 1];
    // tail.lastTailPosition = { x: tail.x, y: tail.y };
    // this.segments.pop();
    // this.segments.unshift(newHead);
    // this.segments[this.segments.length - 1].type = 'tail';
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
