'use client'

import { useEffect, useRef } from 'react';
import GameField from '@lib/GameField';
import Snake from '@lib/SNake';

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
