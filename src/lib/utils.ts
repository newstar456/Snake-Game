 export function readArray(arr: string[], searchPattern:string, sortedDigits:string[]) {

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
    export function searchBestResult(stringArray: string[]){
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

    export default function bestResultRemake(bestResult: string[]){
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


