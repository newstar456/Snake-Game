'use client'

import { useEffect, useRef } from 'react';
import GameField from '@lib/GameField';
import Snake from '@lib/Snake';

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<GameField>();
  const snakeRef = useRef<Snake>();
  const cellSize = 20;

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    fieldRef.current = new GameField();
    const startX = Math.floor(40 / 2); 
    const startY = Math.floor(20 / 2); 
    snakeRef.current = new Snake(startX, startY, cellSize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fieldRef.current?.draw(ctx);
      snakeRef.current?.draw(ctx);
    };

    const loop = () => {

      snakeRef.current?.move();
              // debugger;
      render();
    };

    const interval = setInterval(loop, 200);

    const handleKeyDown = (e: KeyboardEvent) => {
      const snake = snakeRef.current;
      if (!snake) return;

      switch (e.key) {
        case 'ArrowUp':
          snake.setDirection('up');
          break;
        case 'ArrowDown':
          snake.setDirection('down');
          break;
        case 'ArrowLeft':
          snake.setDirection('left');
          break;
        case 'ArrowRight':
          snake.setDirection('right');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  return (
    <div className="flex justify-center mt-10">
      <canvas
        ref={canvasRef}
        width={800}  
        height={400}
        style={{ border: "1px solid #333" }}
      />
    </div>
  );
};

export default GameBoard;
