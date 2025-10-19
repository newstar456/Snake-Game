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
      for (let x = 0; x < 40; x++) {
        const isBorder = x === 0 || y === 0 || x === 39 || y === 19;
        row.push(new GameCell(x * 20, y * 20, !isBorder));
      }
      this.cells.push(row);
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.draw(context);
      });
    });
  }
}
