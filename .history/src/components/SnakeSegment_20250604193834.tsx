import drawImage from './Image';
import { SPRITES } from '@resources/constants/images';
import { SnakeSegmentInt, SnakeInterface } from '@types';


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
  updateHead(context:CanvasRenderingContext2D, direction:HeadDirection, snake:SnakeInterface) {
    const oldSegmentsHead = snake.segments.head;
    const oldSegmentsTail = snake.segments.tail;
    let newCoordinates:{x:number, y:number};
    let headSprite;
    let newLastTailCoordinates:{x:number, y:number};
    function assignCoord(){
      switch (direction) {
        case "toLeft":
          newCoordinates = {...oldSegmentsHead.segmentCoord, x:oldSegmentsHead.segmentCoord.x-20}
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
    function assignLastTailCoord(){
      switch (direction) {
        case "toLeft":
          newLastTailCoordinates = {...oldSegmentsTail.lastTailCoord, x:oldSegmentsTail.lastTailCoord.x-20}
          break;
        case "toRight":
          newLastTailCoordinates = {...coord, x:coord.x+20}
          break;
        case "down":
          newLastTailCoordinates = {...coord, y:coord.y+20}
          break;
        case "up":
          newLastTailCoordinates = {...coord, y:coord.y-20}
          break;
        default:
          console.log(`Irrelevant snake direction!`);
      } 
      return newLastTailCoordinates;
    }
    newLastTailCoordinates = assignLastTailCoord();
    switch (direction) {
      case "toLeft":
        headSprite = SPRITES.HEAD_LEFT;
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
    // const image = new drawImage(headSprite?.src);
    // if(newCoordinates.x != undefined) {
    //   image.createImage(context, newCoordinates.x, newCoordinates.y, 20, 20);
    // }
    return {
      segmentCoord: newCoordinates,
      head: true,
      body: false,
      tail: false,
      lastTailCoord: newLastTailCoordinates,
    }
  }

  updateBody(context: CanvasRenderingContext2D, direction: HeadDirection, snake: SnakeInterface, prevCoord: {x: number, y: number}) {
  const segment = new SnakeSegment(prevCoord, false, true, false, this.lastTailCoord);
  segment.createSegment('body', context, direction);
  return segment;
}

updateTail(context: CanvasRenderingContext2D, direction: HeadDirection, snake: SnakeInterface) {
  const last = snake.headHistory[snake.headHistory.length - 1];
  const segment = new SnakeSegment(last, false, false, true, this.lastTailCoord);
  segment.createSegment('tail', context, direction);
  return segment;
}

  // updateTail(context:CanvasRenderingContext2D, direction:HeadDirection, snake:SnakeInterface) {
  // const oldSegmentsTail = snake.segments.tail;
  // let newCoordinates:{x:number, y:number};
  // let tailSprite;
  // let newLastTailCoordinates:{x:number, y:number};
  // function assignCoord(){
  //   switch (direction) {
  //     case "toLeft":
  //       newCoordinates = {...oldSegmentsTail.segmentCoord, x:oldSegmentsTail.segmentCoord.x-20}
  //       break;
  //     case "toRight":
  //       newCoordinates = {...coord, x:coord.x+20}
  //       break;
  //     case "down":
  //       newCoordinates = {...coord, y:coord.y+20}
  //       break;
  //     case "up":
  //       newCoordinates = {...coord, y:coord.y-20}
  //       break;
  //     default:
  //       console.log(`Irrelevant snake direction!`);
  //   } 
  //   return newCoordinates;
  // }
  // newCoordinates =  assignCoord();
  // function assignLastTailCoord(){
  //   switch (direction) {
  //     case "toLeft":
  //       newLastTailCoordinates = {...oldSegmentsTail.lastTailCoord, x:oldSegmentsTail.lastTailCoord.x-20}
  //       break;
  //     case "toRight":
  //       newLastTailCoordinates = {...coord, x:coord.x+20}
  //       break;
  //     case "down":
  //       newLastTailCoordinates = {...coord, y:coord.y+20}
  //       break;
  //     case "up":
  //       newLastTailCoordinates = {...coord, y:coord.y-20}
  //       break;
  //     default:
  //       console.log(`Irrelevant snake direction!`);
  //   } 
  //   return newLastTailCoordinates;
  // }
  // newLastTailCoordinates = assignLastTailCoord();  
  // switch (direction) {
  //   case "toLeft":
  //     tailSprite = SPRITES.TAIL_LEFT;
  //     break;
  //   case "toRight":
  //     tailSprite = SPRITES.TAIL_RIGHT;
  //     break;
  //   case "down":
  //     tailSprite = SPRITES.TAIL_DOWN;
  //     break;
  //   case "up":
  //     tailSprite = SPRITES.TAIL_TOP;
  //     break;
  //   default:
  //     console.log(`Irrelevant snake direction!`);
  // }
  // //  const image = new drawImage(tailSprite?.src);
  // //  if(newCoordinates.x != undefined) {
  // //    image.createImage(context, newCoordinates.x, newCoordinates.y, 20, 20);
  // //  }
  //  return {
  //    segmentCoord: newCoordinates,
  //    head: false,
  //    body: false,
  //    tail: true,
  //    lastTailCoord: newLastTailCoordinates,
  //  }
  // }

  // updateBody(context:CanvasRenderingContext2D, direction:HeadDirection, snake:SnakeInterface, oldCoord:{x:number, y:number}) {
  //   const oldSegmentsTail = snake.segments.tail;
  //   let newCoordinates:{x:number, y:number};
  //   let newLastTailCoordinates:{x:number, y:number};
  //   function assignCoord(){
  //     switch (direction) {
  //       case "toLeft":
  //         newCoordinates = {...oldCoord, x:oldCoord.x-20}
  //         break;
  //       case "toRight":
  //         newCoordinates = {...coord, x:coord.x+20}
  //         break;
  //       case "down":
  //         newCoordinates = {...coord, y:coord.y+20}
  //         break;
  //       case "up":
  //         newCoordinates = {...coord, y:coord.y-20}
  //         break;
  //       default:
  //         console.log(`Irrelevant snake direction!`);
  //     } 
  //     return newCoordinates;
  //   }
  //   newCoordinates =  assignCoord();
  //   function assignLastTailCoord(){
  //     switch (direction) {
  //       case "toLeft":
  //         newLastTailCoordinates = {...oldSegmentsTail.lastTailCoord, x:oldSegmentsTail.lastTailCoord.x-20}
  //         break;
  //       case "toRight":
  //         newLastTailCoordinates = {...coord, x:coord.x+20}
  //         break;
  //       case "down":
  //         newLastTailCoordinates = {...coord, y:coord.y+20}
  //         break;
  //       case "up":
  //         newLastTailCoordinates = {...coord, y:coord.y-20}
  //         break;
  //       default:
  //         console.log(`Irrelevant snake direction!`);
  //     } 
  //     return newLastTailCoordinates;
  //   }
  //   newLastTailCoordinates = assignLastTailCoord();    
  //   //  const image = new drawImage(SPRITES.BODY.src);
  //   //  if(newCoordinates.x != undefined) {
  //   //    image.createImage(context, newCoordinates.x, newCoordinates.y, 20, 20);
  //   //  }
  //   return {
  //     segmentCoord: newCoordinates,
  //     head: false,
  //     body: true,
  //     tail: false,
  //     lastTailCoord: newLastTailCoordinates,
  //   }
  // } 
}

