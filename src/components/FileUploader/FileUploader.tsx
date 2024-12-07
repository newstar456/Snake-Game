'use client';

import { useState } from 'react';
import bestResultRemake, {searchBestResult} from '@/lib/utils';


export default function FileUploader() {
    
  const [fileContent, setFileContent] = useState('');

  const handleFileUpload = (event:React.ChangeEvent<HTMLInputElement>) => {
    if(!event.target) return;
    if(!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(!event.target) return;
        const content = event.target.result;
        if(content){
          setFileContent(content.toString()); 
        }
      };
      reader.readAsText(file); 
    }
  };

  const splittedString = fileContent.split(/\r?\n|\r|\n/g);
  const bestResult = searchBestResult(splittedString)
  const finalResult = bestResultRemake(bestResult)
  console.log(bestResult);

  return (
    <div className='pt-20 font-[family-name:var(--font-geist-sans)]'>
      <h1>Завантажте свій текстовий файл щоб вирахувати найбільшу числову послідовність</h1>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
      <p>{'Найбільша послідовність з вашого файлу:'}</p>
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
      <div>
          <p>{'Зібраний пазл з вашого файлу:'}</p>
          <p>{finalResult}</p>
      </div>
    </div>
  );
}
