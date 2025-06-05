export default class GameCell {
  x: number;
  y: number;
  isWalkable: boolean;

  constructor(x: number, y: number, isWalkable: boolean) {
    this.x = x;
    this.y = y;
    this.isWalkable = isWalkable;
  }

  draw(context: CanvasRenderingContext2D) {
    context.fillStyle = this.isWalkable ? "#FDFEFE" : "#CDCFCF";
    context.fillRect(this.x, this.y, 20, 20);
    context.strokeStyle = "#cccccc";
    context.strokeRect(this.x, this.y, 20, 20);
  }
}
