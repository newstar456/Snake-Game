'use client'

import { useEffect, useRef } from 'react';
import {GameField, Snake} from '@lib';
// import Snake from '@lib/Snake';

const GameBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const field = new GameField();
    field.draw(ctx);
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
