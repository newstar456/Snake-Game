import GameCell from './GameCell';

export default class GameField {
  cells: GameCell[][] = [];
  cols: number = 40;
  rows: number = 20;
  cellSize: number = 20;

  constructor() {
    this.initializeField();
  }

  initializeField() {
    for (let y = 0; y < 20; y++) {
      const row: GameCell[] = [];
      for (let x = 0; x < this.cols; x++) {
        const isBorder = x === 0 || y === 0 || x === this.cols - 1 || y === this.rows - 1;
        const cell = new GameCell(x * this.cellSize, y * this.cellSize, !isBorder);
        row.push(cell);
      }
      this.cells.push(row);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    for (const row of this.cells) {
      for (const cell of row) {
        cell.draw(context);
      }
    }
  }

  getCell(x: number, y: number): GameCell | undefined {
    return this.cells.flat().find(cell => cell.x === x && cell.y === y);
  }
}
