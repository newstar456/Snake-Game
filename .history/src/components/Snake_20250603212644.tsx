'use client'

import { useMemo } from 'react';
import SnakeSegment from "./SnakeSegment";
type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

export interface SnakeInterface {
  segments: {head:SnakeSegment, body:SnakeSegment[], tail:SnakeSegment},
  headHistory: {x:number, y:number}[],
  headDirection: HeadDirection,
}

export default class Snake implements SnakeInterface {

  constructor(
    private _segments: {head:SnakeSegment, body:SnakeSegment[], tail:SnakeSegment} = {head: new SnakeSegment({x:360, y:180}, true, false, false, {x:440, y:180}), body:[new SnakeSegment({x:380, y:180}, false, true, false, {x:440, y:180}), new SnakeSegment({x:400, y:180}, false, true, false, {x:440, y:180}), new SnakeSegment({x:420, y:180}, false, true, false, {x:440, y:180})], tail: new SnakeSegment({x:440, y:180}, false, false, true, {x:440, y:180})},
    private _headHistory: {x:number, y:number}[] = [{x:360, y:180}, {x:380, y:180},{x:400, y:180},{x:420, y:180},{x:440, y:180}],
    private _headDirection: HeadDirection = 'toLeft',
  ) {}

  get segments(): {head:SnakeSegment, body:SnakeSegment[], tail:SnakeSegment} { return this._segments }
  get headHistory(): {x:number, y:number}[] { return this._headHistory }
  get headDirection(): HeadDirection { return this._headDirection }

  set segments(segments:{head:SnakeSegment, body: SnakeSegment[], tail:SnakeSegment}) {this._segments = segments}
  set headHistory(headHistory:{x:number, y:number}[]) {this._headHistory = headHistory}
  set headDirection(headDirection: HeadDirection) {this._headDirection = headDirection}

  renderSnake(context:CanvasRenderingContext2D, direction:HeadDirection, snake:SnakeInterface) {
    const currentHeadCoord = snake.headHistory[0];
    const totalQtySegments = 1 + snake.segments.body.length + 1;
    const lastTailCoord = snake.headHistory[totalQtySegments-1];
    const bodySegmentsQty = snake.segments.body.length;
    const snakeHead = new SnakeSegment({x:currentHeadCoord.x, y:currentHeadCoord.y}, true, false, false, lastTailCoord);
    snakeHead.createSegment('head', context, direction);
    const snakeTail = new SnakeSegment({x:lastTailCoord.x, y:lastTailCoord.y}, false, false, true, lastTailCoord);
    snakeTail.createSegment('tail', context, direction);
    for(let i=1; i<=bodySegmentsQty; i++){
      const bodySegmentXCoord = currentHeadCoord.x + 20*i;
      const bodySegmentYCoord = currentHeadCoord.y + 20*0;
      const snakeBody = new SnakeSegment({x:bodySegmentXCoord, y:bodySegmentYCoord}, false, true, false, lastTailCoord);
      snakeBody.createSegment('body', context, direction);
    }
  }

  updateSnake(snake:SnakeInterface, context:CanvasRenderingContext2D, direction:HeadDirection):{x:number, y:number}{
    const oldSegmentsHead = snake.segments.head;
    const oldSegmentsBody = snake.segments.body;
    const oldSegmentsTail = snake.segments.tail;
    const oldSegmentsLastTail = snake.segments.tail.lastTailCoord;
    const headHistory = snake.headHistory;

    const newHeadData = () => {
      let newHeadCoord;
      switch (direction) {
        case "toLeft":
          newHeadCoord = {...oldSegmentsHead.segmentCoord, x:oldSegmentsHead.segmentCoord.x-20};
          break;
        case "toRight":
          newHeadCoord = {...oldSegmentsHead.segmentCoord, x:oldSegmentsHead.segmentCoord.x+20};
          break;
        case "down":
          newHeadCoord = {...oldSegmentsHead.segmentCoord, y:oldSegmentsHead.segmentCoord.y+20};
          break;
        case "up":
          newHeadCoord = {...oldSegmentsHead.segmentCoord, y:oldSegmentsHead.segmentCoord.y-20};
          break;
        default:
          console.log(`Irrelevant snake direction!`);
      } 
      return {
        segmentCoord: newHeadCoord,
      }
    }

    const newHead = (newHeadData() as unknown) as {segmentCoord: {x:number, y:number}};//return only coord;

    // const newHead = oldSegmentsHead.updateHead(context, direction, snake);
    const newTail:SnakeSegment = oldSegmentsTail.updateTail(context, direction, snake);

    const newSnakeBody = [];
    for(let i=0; i<oldSegmentsBody.length; i++){
      const newBodySegment:SnakeSegment = oldSegmentsBody[i].updateBody(context, direction, snake, oldSegmentsBody[i].segmentCoord);
      newSnakeBody.push(newBodySegment);
    }
    const newHeadHistory:{x:number, y:number}[] = [newHead.segmentCoord, ...headHistory];
    // console.log(newHeadHistory);

    return {
      segments: {head: newHead, body: newSnakeBody, tail: newTail},
      headHistory: newHeadHistory,
      headDirection: direction,
    };
  }



}