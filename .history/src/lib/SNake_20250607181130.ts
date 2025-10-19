import SnakeSegment from './SnakeSegment';
import GameField from './GameField';

export default class Snake {

  segments: SnakeSegment[] = [];
  movementHistory: { x: number; y: number }[] = [];
  direction: 'up' | 'down' | 'left' | 'right' = 'left';
  cellSize: number;

  constructor(startX: number, startY: number, cellSize: number) {
    this.cellSize = cellSize;
    for (let i = 0; i < 5; i++) {
      const type = i === 0 ? 'head' : (i === 4 ? 'tail' : 'body');
      const segment = new SnakeSegment(startX + i, startY, type, this.direction);
      this.segments.push(segment);
      this.movementHistory.push({ x: startX + i, y: startY });
    }
    this.preloadImages();
  }
  async preloadImages() {
    for (const segment of this.segments) {
      await segment.loadImage();
    }
  }

  move(field: GameField):boolean {
    const head = this.segments[0];
    const newHead = new SnakeSegment(head.x, head.y, 'head', this.direction);
    switch (this.direction) {
      case 'left': newHead.x -= 1; break;
      case 'right': newHead.x += 1; break;
      case 'up': newHead.y -= 1; break;
      case 'down': newHead.y += 1; break;
    }
    const nextCell = field.getCell(newHead.x, newHead.y);
    if (!nextCell || !nextCell.isWalkable) {
      return false;
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
    head.x = newHead.x;
    head.y = newHead.y;
    this.movementHistory.pop();
    const tail = this.segments[this.segments.length - 1];
    const beforeTail = this.segments[this.segments.length - 2];


    tail.updateDirection(this.getDirectionBetween(beforeTail, tail));
    return true;
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
    const head = this.segments[0];
    head.updateDirection(newDirection);
  }
  getDirectionBetween(from: SnakeSegment, to: SnakeSegment): 'up' | 'down' | 'left' | 'right' {
    if (from.x === to.x) {
      return from.y < to.y ? 'up' : 'down';
    } else {
      return from.x < to.x ? 'left' : 'right';
    }
  } 

}
