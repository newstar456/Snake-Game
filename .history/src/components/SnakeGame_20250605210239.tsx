'use client'

import React, {useEffect, useState, useRef} from 'react'
// import SingleCell from './SingleCell';
import Snake from '../lib/Snake';
// import SnakeSegment from "./SnakeSegment";
import {HeadDirection,SnakeInterface} from '@types'



const SnakeGame = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [direction, setDirection] = useState<HeadDirection>('toLeft');
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [snake, setSnake] = useState<Snake|null>(null);
    const animationFrameRef = useRef<number>();

    useEffect(() => {

        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;
        canvas.width = 800;
        canvas.height = 400;

        const drawCanvas = () => {
            const cells_array = [];

            for (let i = 1; i < 39; i++) {
              for (let j = 1; j < 19; j++) {
                const xpos = i * 20;
                const ypos = j * 20;
                const cell = new SingleCell(xpos, ypos, true);
                cell.draw(context);
              }
            }

            for (let i = 1; i < 39; i++) {
              const xpos = i * 20;
              const top = new SingleCell(xpos, 0, false);
              const bottom = new SingleCell(xpos, 380, false);
            //   cells_array.push(top);
            //   cells_array.push(bottom);
              top.draw(context);
              bottom.draw(context);
            }

            for (let j = 0; j < 20; j++) {
              const ypos = j * 20;
              const left = new SingleCell(0, ypos, false);
              const right = new SingleCell(780, ypos, false);
              left.draw(context);
              right.draw(context);
            }
        };

        drawCanvas();

        if (gameActive) {
            if (!snake) {
              const newSnake = new Snake();
              setSnake(newSnake);
            }
            const render = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                drawCanvas();

                if (snake) {
                  const updatedData: SnakeInterface = snake.updateSnake(snake, context, direction);
                  const updatedSnake = new Snake(
                    updatedData.segments,
                    updatedData.headHistory,
                    updatedData.headDirection
                  );
                  setSnake(updatedSnake);
                  updatedSnake.renderSnake(context, direction, updatedSnake);
                }
                animationFrameRef.current = requestAnimationFrame(render);
            };

            render();
        }
        return () => {
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, [gameActive, direction]);


  return (
    <div className="w-full text-center">
      <canvas ref={canvasRef} className="inline" />
      <div className="flex justify-evenly flex-wrap">
        <button
          className="bg-red-950 rounded-sm h-10 w-40 p-1 text-white m-2"
          onClick={() => setGameActive(!gameActive)}
        >
          {gameActive ? 'PAUSE' : 'START'}
        </button>
        <button className="bg-pink-900 rounded-sm h-10 w-40 p-1 text-white m-2" onClick={() => setDirection('toLeft')}>
          TO LEFT
        </button>
        <button className="bg-pink-900 rounded-sm h-10 w-40 p-1 text-white m-2" onClick={() => setDirection('toRight')}>
          TO RIGHT
        </button>
        <button className="bg-pink-900 rounded-sm h-10 w-40 p-1 text-white m-2" onClick={() => setDirection('down')}>
          TO DOWN
        </button>
        <button className="bg-pink-900 rounded-sm h-10 w-40 p-1 text-white m-2" onClick={() => setDirection('up')}>
          TO UP
        </button>
      </div>
      <p>{direction}</p>
    </div>
  );
}

export default SnakeGame