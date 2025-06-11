'use client'

import { useEffect, useRef } from 'react';
import GameField from '@lib/GameField';
import Snake from '@lib/Snake';
import Bonus from '@lib/Bonus';
type GameStatus = 'start' | 'running' | 'paused' | 'ended' | 'stopped';

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<GameField>();
  const snakeRef = useRef<Snake>();
  const cellSize = 20;
  const gameStatus = useRef<GameStatus>('start');
  const score = useRef<number>(0);

  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    let bonus: Bonus | null = null;
    let bonusTimeout: NodeJS.Timeout | null = null;
    fieldRef.current = new GameField();
    const startX = Math.floor(40 / 2); 
    const startY = Math.floor(20 / 2); 
    snakeRef.current = new Snake(startX, startY, cellSize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // switch (gameStatus.current) {
      //   case 'start': drawOverlayText("Start of the game - Press Any Key"); break;
      //   case 'paused': drawOverlayText("Game paused - Press Any Key"); break;
      //   case 'ended': drawOverlayText(`Game completed, ${score.current} points`); break;
      //   case 'stopped': drawOverlayText(`Game stopped, ${score.current} points`); break;
      // }
        if (gameStatus.current === 'start') {
    drawOverlayText("Start of the game - Press Any Key");
    return;
  }

  if (gameStatus.current === 'paused') {
    drawOverlayText("Game paused - Press Any Key");
    return;
  }

  if (gameStatus.current === 'ended') {
    drawOverlayText(`Game completed, ${score.current} points`);
    return;
  }

  if (gameStatus.current === 'stopped') {
    drawOverlayText(`Game stopped, ${score.current} points`);
    return;
  }
      fieldRef.current?.draw(ctx);
      bonus?.draw(ctx, cellSize); 
      snakeRef.current?.draw(ctx);
      ctx.fillStyle = "#000";
      ctx.font = "16px Arial";
      ctx.fillText(`Score: ${score.current}`, 10, 20);
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

    const drawOverlayText = (text: string) => {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus.current === 'start') {
        gameStatus.current = 'running';
        // bonus = Bonus.createRandom(snakeRef.current!.getCoordinates(), fieldRef.current!);
        score.current = 0;
        render();
        return;
      }
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
    bonus = Bonus.createRandom(snakeRef.current.getCoordinates(), fieldRef.current);
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
