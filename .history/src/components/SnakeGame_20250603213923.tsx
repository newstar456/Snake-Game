'use client'

import React, {useEffect, useState} from 'react'
import SingleCell from './SingleCell';
import Snake, {SnakeInterface} from './Snake';
// import SnakeSegment from "./SnakeSegment";

type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

const SnakeGame = () => {



    const [direction, setDirection] = useState<HeadDirection>('toLeft');
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [snake, setSnake] = useState<Snake|null>(null);

    useEffect(() => {
        let canvas = document.getElementById("canvas") as HTMLCanvasElement;
        let context = canvas.getContext("2d") as CanvasRenderingContext2D;
        canvas.width = 800;
        canvas.height = 400;
        let cells_array = [];
        let animationFrameId: number;
        
        const startButton = document.getElementById('startGame')
        const toLeftButton = document.getElementById('toLeft')

        function createCanvas(){

            for (let i = 1; i<39; i++) {
                for (let j = 1; j<19;j++) {
                    const xpos = i * 20;
                    const ypos = j * 20;
                    const cell = new SingleCell(xpos,ypos, true);
                    cell.draw(context);
                }
            }
            for (let i = 1; i<39; i++) {
                const xpos = i * 20;
                const cell = new SingleCell(xpos,0, false);
                cells_array.push(cell);
                cell.draw(context);
            }
            for (let i = 1; i<39; i++) {
                const xpos = i * 20;
                const cell = new SingleCell(xpos,380, false);
                cell.draw(context);
            }
            for (let j = 0; j<20;j++) {
                const ypos = j * 20;
                const cell = new SingleCell(0,ypos, false);
                cell.draw(context);
            }
            for (let j = 0; j<20;j++) {
                const ypos = j * 20;
                const cell = new SingleCell(780,ypos, false);
                cell.draw(context);
            }
        }
        createCanvas();

        startButton?.addEventListener('click', handleStartPause, false);
        toLeftButton?.addEventListener('click', handleMoveToLeft, false);

        function handleStartPause() {
            if(!gameActive){
                setGameActive(true)
                console.log('game active');
                if(!snake){
                    const newSnake = new Snake();
                    setSnake(newSnake);
                } else {
                    console.log(snake);
                    // snake?.createSnake(context, direction);
                }
            } else{
                setGameActive(false)
                console.log('game paused');
            }
        }

        //  console.log(snake);

        function handleMoveToLeft() {
            context.clearRect(0,0, canvas.width, canvas.height);
            createCanvas();
            if(!snake) return;
            console.log(snake); 
            const updatedSnakeData:SnakeInterface = snake.updateSnake(snake, context, direction);
            console.log(updatedSnakeData);
            // snake.segments = updatedSnakeData.segments;
            const updatedSnake = new Snake(
                updatedSnakeData.segments,
                updatedSnakeData.headHistory,
                updatedSnakeData.headDirection
            );
            setSnake(updatedSnake);

            // const updatedSnake = new Snake({head: updatedSnakeData?.segments.head, body:[updatedSnakeData?.segments.body[0],updatedSnakeData?.segments.body[1], updatedSnakeData?.segments.body[2]], tail: updatedSnakeData?.segments.tail},updatedSnakeData?.headHistory,updatedSnakeData?.headDirection);
            // setSnake(updatedSnake);
            // console.log(updatedSnake);
            // console.log();
        }

        const init = () => {
            const render = () => {
                snake?.renderSnake(context, direction, snake);//to create images only in fucn renderSnake, and in other funcs only to update data
                animationFrameId = requestAnimationFrame(render);
            };
            render();
        };

        init();
        return () => {
            cancelAnimationFrame(animationFrameId);
        };

    }, [gameActive]);

    function startGame(){ 
        setGameActive(!gameActive);
    }
    function setRightToLeft(){ setDirection('toLeft')}
    function setLeftToRight(){ setDirection('toRight')}
    function setUpToDown(){ setDirection('down')}
    function setDownToUp(){ setDirection('up')}

  return (
    <div className='w-full text-center'>
        <canvas id="canvas" className='inline'></canvas>
        <div className='flex justify-evenly'>
            <button className='bg-red-950 rounded-sm h-10 w-50 p-1 text-center align-middle m-5' onClick={startGame} id='startGame'>START/PAUSE</button>
            <button className='bg-pink-900 rounded-sm h-10 w-50 p-1 text-center align-middle m-5' onClick={setRightToLeft} id='toLeft'>TO LEFT</button>
            <button className='bg-pink-900 rounded-sm h-10 w-50 p-1 text-center align-middle m-5' onClick={setLeftToRight}>TO RIGHT</button>
            <button className='bg-pink-900 rounded-sm h-10 w-50 p-1 text-center align-middle m-5' onClick={setUpToDown}>TO DOWN</button>
            <button className='bg-pink-900 rounded-sm h-10 w-50 p-1 text-center align-middle m-5' onClick={setDownToUp}>TO UP</button>
        </div>
        <p>{direction}</p>
    </div>
  )
}

export default SnakeGame