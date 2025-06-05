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
    context.fillStyle = this.isWalkable ? "#ffffff" : "#000000"; // white for walkable, black for border
    context.fillRect(this.x, this.y, 20, 20); // each cell is 20x20px
    context.strokeStyle = "#cccccc";
    context.strokeRect(this.x, this.y, 20, 20);
  }
}
