// 'use client'
import { promises as fs } from 'fs';
import bestResultRemake, {searchBestResult} from '@/lib/utils';
// import FileUploader from '@/components/FileUploader/FileUploader';
// import Canvas from '@/components/Canvas';
// import Canvas2 from '@/components/Canvas2';
// import Canvas3 from '@/components/Canvas3';
// import CanvasDragAndDrop from '@/components/CanvasDragAndDrop';
// import Paint from '@/components/Paint';
// import Image from '@/components/Image';
import SnakeGame from '@/components/SnakeGame';

export default async function Home() {

  
  return (
    <div className="flex flex-col items-start justify-center font-[family-name:var(--font-geist-sans)]">
        {/* <div>
          <p>{'Найбільша послідовність з тестового файлу:'}</p>
          {bestResult.map((number,idx) => {
            return ( 
              <div className='inline-block' key={idx}>
                <span>{' '}</span>
                <span>{number}</span>
                <span>{' '}</span>
                {idx === bestResult.length-1 ? ' ' :  <span>{'> '}</span>}
              </div>
            )
          })}
          <p>{'Зібраний пазл з тестового файлу:'}</p>
          <p>{finalResult}</p>
        </div> */}
        {/* <FileUploader /> */}
        {/* <Canvas /> */}
        {/* <Image /> */}
        {/* <Canvas2 /> */}
        {/* <Canvas3 /> */}
        {/* <Paint /> */}
        {/* <CanvasDragAndDrop /> */}
        {/* <SnakeGame /> */}
    </div>
  );
}

