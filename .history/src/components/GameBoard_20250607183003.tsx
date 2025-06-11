'use client'

import { useEffect, useRef } from 'react';
import GameField from '@lib/GameField';
import Snake from '@lib/Snake';
import Bonus from '@lib/Bonus';

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
      const snake = snakeRef.current;
      const field = fieldRef.current;
      if (!snake || !field) return;
      const alive = snake.move(field);
      if (!alive) {
        clearInterval(interval);
        alert("Game Over!");
        return;
      }
      render();
    };


    const interval = setInterval(loop, 500);

    const handleKeyDown = (e: KeyboardEvent) => {
      const snake = snakeRef.current;
      if (!snake) return;

      const dir = snake.direction;
      if ((e.key === 'ArrowUp' || e.key === 'w') && (dir === 'left' || dir === 'right')) {
        snake.setDirection('up');
      } else if ((e.key === 'ArrowDown' || e.key === 's') && (dir === 'left' || dir === 'right')) {
        snake.setDirection('down');
      } else if ((e.key === 'ArrowLeft' || e.key === 'a') && (dir === 'up' || dir === 'down')) {
        snake.setDirection('left');
      } else if ((e.key === 'ArrowRight' || e.key === 'd') && (dir === 'up' || dir === 'down')) {
        snake.setDirection('right');
      }

    };
    let bonus = generateBonus(fieldRef.current);

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
