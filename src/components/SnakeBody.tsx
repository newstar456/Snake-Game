import drawImage from './Image';

interface SnakeBodyCell {
  x:number,
  y:number,
  head: boolean,
  body: boolean,
  tail: boolean,
  lastTailPos:{x:number, y:number},
  sprite: string,
  createCell(context:CanvasRenderingContext2D): void,
}

export default class SnakeBodySegment implements SnakeBodyCell {

  constructor(
    private _x: number = 0,
    private _y: number = 0,
    private _head: boolean = false,
    private _body: boolean = false,
    private _tail: boolean = false,
    private _lastTailPos: {x:number, y:number} = {x:0, y:0},
    private _sprite: string = '',
  ) {}

  get x(): number { return this._x; }
  get y(): number { return this._y; }
  get head(): boolean { return this._head; }
  get body(): boolean { return this._body; }
  get tail(): boolean { return this._tail; }
  get lastTailPos(): {x:number, y:number} { return this._lastTailPos }
  get sprite(): string { return this._sprite; }

  set x(x:number) {this._x = x}
  set y(y:number) {this._y = y}
  set head(head: boolean) {this._head = head}
  set body(body: boolean) {this._body = body}
  set tail(tail: boolean) {this._tail = tail}
  set lastTailPos(lastTail:{x:number, y:number} ) {this._lastTailPos= lastTail}
  set sprite(sprite: string) {this._sprite = sprite}
  

  createCell(segmentName:string, headDirection:string, context:CanvasRenderingContext2D) {
    // if(segmentName === 'head') this._sprite = path;
    const image = new drawImage(this._sprite);
    image.createImage(context, this._x, this._y, 20, 20);
    // context.fillText(this._text, this._x+5, this._y+5);
    // context.textAlign = "center";
    // context.textBaseline = "middle"
    // context.font = "10px Arial";
    // context.fillStyle = 'green';
    // context.fillRect(this._x, this._y, 20, 20);
    // context.strokeStyle = 'green';
    // var fillRect = true;
    // context.strokeRect(this._x, this._y, 20, 20);
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

