// 'use client'

import { promises as fs } from 'fs';

// import findString from '../components/dataReader/DataReader'

export default async function Home() {
// 'use client';

// export default function Home() {

// const array = ['942517', '605676', '498291', '668826', '357057', '478151', '315629', '007148', '252887', '421662', '284505', '467650', '115330', '648206', '207562', '612298', '576885', '294200', '847595', '021597', '074878', '801997', '585401', '168510', '385293', '151863', '022142', '340350', '976151', '337989', '863284', '488310', '303887', '939173', '331413', '905657', '833617', '170794', '094486', '551394', '943693', '147970', '400196', '537505', '367493', '117178', '675840', '868721', '519081', '735564', '401733', '915348', '169233', '324651', '958675', '368753', '861460', '401341', '343222', '794373', '816374', '535119', '188234', '577779', '097792', '729303', '782637', '148159', '830641', '716890', '397853', '871196', '277603', '749226', '839595', '131852', '409432', '810698', '456030', '529185', '758823', '265024', '051041', '699031', '737269', '139340', '730977', '249786', '039931', '055669', '100107', '653178', '279773', '336550', '332847', '685485', '423269', '193536', '890062', '377637', '595777', '412134', '322736', '546929', '616370', '767332', '781184', '920944', '851005', '258850', '064083', '051202', '427711', '359855', '540928', '314284', '085261', '880969', '649699', '064881', '705423', '646927', '252556', '272007', '217511', '620286', '229724', '108865', '124636', '231417', '961201', '658432', '775416', '246027', '854036', '687762', '389097', '013153', '417085', '919198', '988711', '488665']

  const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
  const splittedString = file.split(/\r?\n|\r|\n/g);
  function readArray(arr: string[], searchPattern:string, sortedDigits:string[]) {

    const mainDigitEnd = searchPattern.slice(4,6);
    let j=0;
    const arrCopy = arr.slice()

    while (j < arrCopy.length) {
      const checkDigitStart = arrCopy[j].slice(0,2);
      if(mainDigitEnd === checkDigitStart) {
        if(!sortedDigits.includes(searchPattern)){
          sortedDigits.push(searchPattern);
        }
        sortedDigits.push(arrCopy[j]);
        const newArray = arrCopy.toSpliced(j,1)
        readArray(newArray, arrCopy[j], sortedDigits);
        break;
      } 
        j++;
    }
        return sortedDigits;
    }
  function searchBestResult(stringArray: string[]){
    const results = [];
    for(let i=0; i<stringArray.length; i++){
      const result = readArray(stringArray, stringArray[i], [stringArray[i]]);///or to change to empty array as third arg
      results.push(result);
    }
    const lengths = results.map(result=>result.length);
    const longestArrayIdx = lengths.indexOf(Math.max(...lengths));
    const bestResult = results[longestArrayIdx];
    return bestResult;
  }
  const bestResult = searchBestResult(splittedString)
  function bestResultRemake(bestResult: string[]){
    let newArray = [];
    for(let i=0; i<bestResult.length; i++){
      if(i===bestResult.length-1){
        newArray.push(bestResult[i].slice(0,6));
      } else {
        newArray.push(bestResult[i].slice(0,4));
      }
    }
    return newArray.join('');
  }
  const finalResult = bestResultRemake(bestResult)
  
  console.log(bestResult);
  console.log(finalResult);
   
  return (
    <div className="flex items-center justify-centercenter font-[family-name:var(--font-geist-sans)] p-4">
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
          <br/>
          <p>{'Зібраний пазл з тестового файлу:'}</p>
          <p>{finalResult}</p>
        </div>
    </div>
  );
}

////used: 1. Nodejs docs; 2. 3.
////idea: create a child client component where we go to see the results
