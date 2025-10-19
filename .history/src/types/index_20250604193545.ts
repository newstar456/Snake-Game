export type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

export interface SnakeInterface {
  segments: {head:SnakeSegmentInt, body:SnakeSegmentInt[], tail:SnakeSegmentInt},
  headHistory: {x:number, y:number}[],
  headDirection: HeadDirection,
}

export interface SnakeSegmentInt {
    segmentCoord:{x:number, y:number}| undefined,
    head: boolean,
    body: boolean,
    tail: boolean,
    lastTailCoord: {x:number, y:number},
    ///to add methods of SnakeSegment class???
}