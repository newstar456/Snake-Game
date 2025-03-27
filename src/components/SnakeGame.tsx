'use client'

import React, {useEffect, useState} from 'react'
import SingleCell from './SingleCell';
import Snake, {SnakeInterface} from './Snake';
import SnakeSegment from "./SnakeSegment";

const SnakeGame = () => {

    type HeadDirection = 'toLeft' | 'toRight' | 'down' | 'up';

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
                if(snake === null){
                    const newSnake = new Snake({head: new SnakeSegment({x:360, y:180}, true, false, false, {x:440, y:180}), body:[ new SnakeSegment({x:380, y:180}, false, true, false, {x:440, y:180}), new SnakeSegment({x:400, y:180}, false, true, false, {x:440, y:180}), new SnakeSegment({x:420, y:180}, false, true, false, {x:440, y:180})], tail: new SnakeSegment({x:440, y:180}, false, false, true, {x:440, y:180})},[{x:360, y:180}, {x:380, y:180},{x:400, y:180},{x:420, y:180},{x:440, y:180}],'toLeft');
                    setSnake(newSnake);
                    // console.log(snake);
                    // console.log(newSnake);
                } else {
                    console.log(snake);
                    // snake?.createSnake(context, direction);
                }

            } else{
                setGameActive(false)
                console.log('game paused');
            }
        }

        function handleMoveToLeft() {
            context.clearRect(0,0, canvas.width, canvas.height);
            createCanvas();
            if(!snake) return;
            const updatedSnakeData:SnakeInterface = snake.updateSnake(snake, context, direction);
            const updatedSnake = new Snake({head: updatedSnakeData?.segments.head, body:updatedSnakeData?.segments.body, tail: updatedSnakeData?.segments.tail},updatedSnakeData?.headHistory,updatedSnakeData?.headDirection);
            setSnake(updatedSnake);
            console.log(updatedSnake);
        }

        const init = () => {
            const render = () => {
                snake?.createSnake(context, direction);
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