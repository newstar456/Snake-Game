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
      bonus.draw(ctx, cellSize); 
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
      const head = snake.segments[0];
      if (bonus && head.x === bonus.x && head.y === bonus.y) {
        snake.grow();
        bonus = null;
        if (bonusTimeout) clearTimeout(bonusTimeout);
        bonusTimeout = setTimeout(() => {
          bonus = Bonus.createRandom(snake.getCoordinates(), field);
        }, 500);
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
    let bonus: Bonus | null = null;
    let bonusTimeout: NodeJS.Timeout | null = null;
    // let bonus = generateBonus(fieldRef.current);
    // function generateBonus(field: GameField): Bonus {
    //   let bonusX = 0, bonusY = 0;
    //   while (true) {
    //     bonusX = Math.floor(Math.random() * 40);
    //     bonusY = Math.floor(Math.random() * 20);
    //     const cell = field.getCell(bonusX, bonusY);
    //     if (cell?.isWalkable) break;
    //   }
    //   return new Bonus();
    // }

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
