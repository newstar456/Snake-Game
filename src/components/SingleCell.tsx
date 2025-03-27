interface TableSingleCell {
  x:number,
  y:number,
  permeability:boolean,
  draw(context:CanvasRenderingContext2D): void,
}

export default class SingleCell implements TableSingleCell {

  constructor(
    private _x: number = 0,
    private _y: number = 0,
    private _permeability: boolean = false,
  ) {}
  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get permeability(): boolean { return this._permeability; }

  set x(x:number) {this._x = x}
  set y(y:number) {this._y = y}
  set permeability(permeability:boolean) {this._permeability = permeability}


  draw(context:CanvasRenderingContext2D) {
    // context.fillText(this._text, this._x+5, this._y+5);
    // context.textAlign = "center";
    // context.textBaseline = "middle"
    // context.font = "10px Arial";
    context.fillStyle = this._permeability ? '#FDFEFE' : '#CDCFCF';
    context.fillRect(this._x, this._y, 20, 20);
    context.strokeStyle = '#FBEAEA';
    // var fillRect = true;
    context.strokeRect(this._x, this._y, 20, 20);
    // if (fillRect) {
    //   context.fill();
    // }
    // context.stroke();
    // context.fillStyle = this._permeability ? '#FDFEFE' : '#CDCFCF';
    // context.beginPath();
    // context.strokeStyle = '#FBEAEA';
    // context.fillRect(this._x, this._y, 20, 20); 
    // context.stroke();
    // context.closePath();
  }
}

