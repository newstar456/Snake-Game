import drawImage from './Image';
import { SPRITES } from '@/resources/constants/images';

interface SnakeSegmentInt {
    segmentCoord:{x:number, y:number},
    head: boolean,
    body: boolean,
    tail: boolean,
    lastTailCoord: {x:number, y:number},
}
type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

export default class SnakeSegment implements SnakeSegmentInt {

  constructor(
    private _segmentCoord: {x:number, y:number},
    private _head: boolean = false,
    private _body: boolean = false,
    private _tail: boolean = false,
    private _lastTailCoord: {x:number, y:number},
  ) {}

  get segmentCoord():{x:number, y:number} { return this._segmentCoord }
  get head(): boolean { return this._head }
  get body(): boolean { return this._body }
  get tail(): boolean { return this._tail }
  get lastTailCoord():{x:number, y:number} { return this._lastTailCoord }

  set segmentCoord(segmentCoord:{x:number, y:number}) {this._segmentCoord = segmentCoord}
  set head(head:boolean) {this._head = head}
  set body(body:boolean) {this._body = body}
  set tail(tail:boolean) {this._tail = tail}
  set lastTailCoord(lastTailCoord:{x:number, y:number}) {this._lastTailCoord = lastTailCoord}

  createSegment(segmentName:string, context:CanvasRenderingContext2D, direction: HeadDirection) {
    let headSprite, tailSprite;
    switch (direction) {
      case "toLeft":
        headSprite = SPRITES.HEAD_LEFT;
        tailSprite = SPRITES.TAIL_LEFT;
        break;
      case "toRight":
        headSprite = SPRITES.HEAD_RIGHT;
        tailSprite = SPRITES.TAIL_RIGHT;
        break;
      case "down":
        headSprite = SPRITES.HEAD_DOWN;
        tailSprite = SPRITES.TAIL_DOWN;
        break;
      case "up":
        headSprite = SPRITES.HEAD_TOP;
        tailSprite = SPRITES.TAIL_TOP;
        break;
      default:
        console.log(`Irrelevant snake direction!`);
    }
    const sprite = segmentName === 'body' ? SPRITES.BODY.src : segmentName === 'tail' ? tailSprite?.src : headSprite?.src;
    const image = new drawImage(sprite);
    image.createImage(context, this.segmentCoord.x, this.segmentCoord.y, 20, 20);
  }
  updateSegment(segmentName:string, context:CanvasRenderingContext2D, direction: HeadDirection, coord:{x:number, y:number}) {
    let newCoordinates:{x:number, y:number};
    let headSprite, tailSprite;
    function assignCoord(){
      switch (direction) {
        case "toLeft":
          newCoordinates = {...coord, x:coord.x-20}
          break;
        case "toRight":
          newCoordinates = {...coord, x:coord.x+20}
          break;
        case "down":
          newCoordinates = {...coord, y:coord.y+20}
          break;
        case "up":
          newCoordinates = {...coord, y:coord.y-20}
          break;
        default:
          console.log(`Irrelevant snake direction!`);
      } 
      return newCoordinates;
    }
    newCoordinates =  assignCoord();
    switch (direction) {
      case "toLeft":
        headSprite = SPRITES.HEAD_LEFT;
        tailSprite = SPRITES.TAIL_LEFT;
        break;
      case "toRight":
        headSprite = SPRITES.HEAD_RIGHT;
        tailSprite = SPRITES.TAIL_RIGHT;
        break;
      case "down":
        headSprite = SPRITES.HEAD_DOWN;
        tailSprite = SPRITES.TAIL_DOWN;
        break;
      case "up":
        headSprite = SPRITES.HEAD_TOP;
        tailSprite = SPRITES.TAIL_TOP;
        break;
      default:
        console.log(`Irrelevant snake direction!`);
    }
    const sprite = segmentName === 'body' ? SPRITES.BODY.src : segmentName === 'tail' ? tailSprite?.src : headSprite?.src;
    const image = new drawImage(sprite);
    if(newCoordinates.x != undefined) {
      image.createImage(context, newCoordinates.x, newCoordinates.y, 20, 20);
    }
    return {
      segmentCoord: newCoordinates,
      head: this.head,
      body: this.body,
      tail: this.tail,
      lastTailCoord: this._lastTailCoord,
    }
  }
}

