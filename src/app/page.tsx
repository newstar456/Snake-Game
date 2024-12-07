// 'use client'
import { promises as fs } from 'fs';
import bestResultRemake, {searchBestResult} from '@/lib/utils';
import FileUploader from '@/components/FileUploader/FileUploader';

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
  const splittedString = file.split(/\r?\n|\r|\n/g);
  const bestResult = searchBestResult(splittedString)
  const finalResult = bestResultRemake(bestResult)
   
  return (
    <div className="flex flex-col items-start justify-center font-[family-name:var(--font-geist-sans)] p-4">
        <div>
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
        </div>
        <FileUploader />
    </div>
  );
}

