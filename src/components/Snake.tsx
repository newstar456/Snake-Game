import SnakeSegment from "./SnakeSegment";

type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

export interface SnakeInterface {
  segments: {head:SnakeSegment, body:SnakeSegment[], tail:SnakeSegment},
  headHistory: {x:number, y:number}[],
  headDirection: HeadDirection,
}

export default class Snake implements SnakeInterface {

  constructor(
    private _segments: {head:SnakeSegment, body:[SnakeSegment,SnakeSegment,SnakeSegment], tail:SnakeSegment},
    private _headHistory: {x:number, y:number}[] = [{x:360, y:180}, {x:380, y:180},{x:400, y:180},{x:420, y:180},{x:440, y:180}],
    private _headDirection: HeadDirection,
  ) {}

  get segments(): {head:SnakeSegment, body:SnakeSegment[], tail:SnakeSegment} { return this._segments }
  get headHistory(): {x:number, y:number}[] { return this._headHistory }
  get headDirection(): HeadDirection { return this._headDirection }

  set segments(segments:{head:SnakeSegment, body:[SnakeSegment,SnakeSegment,SnakeSegment], tail:SnakeSegment}) {this._segments = segments}
  set headHistory(headHistory:{x:number, y:number}[]) {this._headHistory = headHistory}
  set headDirection(headDirection: HeadDirection) {this._headDirection = headDirection}

  createSnake(context:CanvasRenderingContext2D, direction:HeadDirection) {
    const currentHeadCoord = this._headHistory[0];
    const totalQtySegments = 1 + this._segments.body.length + 1;
    const lastTailCoord = this._headHistory[totalQtySegments-1];
    const bodySegmentsQty = this._segments.body.length;
    const snakeHead = new SnakeSegment({x:currentHeadCoord.x, y:currentHeadCoord.y}, true, false, false, lastTailCoord);
    snakeHead.createSegment('head', context, direction);
    const snakeTail = new SnakeSegment({x:lastTailCoord.x, y:lastTailCoord.y}, false, false, true, lastTailCoord);
    snakeTail.createSegment('tail', context, direction);
    for(let i=1; i<=bodySegmentsQty; i++){
      const bodySegmentXCoord = currentHeadCoord.x + 20*i;
      const bodySegmentYCoord = currentHeadCoord.y + 20*0;//////to change for other directions
      const snakeBody = new SnakeSegment({x:bodySegmentXCoord, y:bodySegmentYCoord}, false, true, false, lastTailCoord);
      snakeBody.createSegment('body', context, direction);
    }
  }

  updateSnake(snake:SnakeInterface, context:CanvasRenderingContext2D, direction:HeadDirection):SnakeInterface{
    // console.log(snake);
    const oldSegmentsHead = snake.segments.head;
    const oldSegmentsBody = snake.segments.body;
    const oldSegmentsTail = snake.segments.tail;
    const headHistory = snake.headHistory;
    const oldHeadHDirection = snake.headDirection;
    // console.log(oldHeadHistory);
    const newHead:SnakeSegment = oldSegmentsHead.updateSegment('head', context, direction, oldSegmentsHead.segmentCoord);
    const newTail:SnakeSegment = oldSegmentsTail.updateSegment('tail', context, direction, oldSegmentsTail.segmentCoord);
    console.log(headHistory);
    for(let i=1; i<oldSegmentsBody.length; i++){
      const newBodySegment:SnakeSegment = oldSegmentsBody[i].updateSegment('body', context, direction, oldSegmentsBody[i].segmentCoord);
    }
    headHistory.unshift(newHead.segmentCoord);
    return {
      segments: {head: newHead, body: oldSegmentsBody, tail: newTail},
      headHistory: headHistory,
      headDirection: direction,
    };
  }


  // move(context:CanvasRenderingContext2D, direction:HeadDirection) {
  //   const head = this.segments.head;
  //   const tail = this.segments.tail;
  //   const bodySegments = this.segments.body;
  //   const bodySegmentsQty = this._segments.body.length;
  //   switch (direction) {
  //     case "toLeft":
  //       head.segmentCoord.x -= 20;
  //       tail.segmentCoord.x -= 20;
  //       for(let i=0; i<bodySegmentsQty; i++){
  //         bodySegments[i].segmentCoord.x -= 20;
  //      }
  //      this.updateSnake(head.segmentCoord, bodySegments, tail.segmentCoord, context, direction);
  //       break;
  //     case "toRight":
  //       head.segmentCoord.x -= 20;
  //       head.segmentCoord.y -= 20;
  //       break;
  //     case "down":
  //       head.segmentCoord.x -= 20;
  //       head.segmentCoord.y -= 20;
  //       break;
  //     case "up":
  //       head.segmentCoord.x -= 20;
  //       head.segmentCoord.y -= 20;
  //       break;
  //     default:
  //       console.log(`Irrelevant snake direction!`);
  //   }
  //   console.log(head.segmentCoord);
  // }
}