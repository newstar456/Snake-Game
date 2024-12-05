// import Image from "next/image";
// import { promises as fs } from 'fs';

// export default async function Home() {
'use client';

export default function Home() {


const array = ['942517', '605676', '498291', '668826', '357057', '478151', '315629', '007148', '252887', '421662', '284505', '467650', '115330', '648206', '207562', '612298', '576885', '294200', '847595', '021597', '074878', '801997', '585401', '168510', '385293', '151863', '022142', '340350', '976151', '337989', '863284', '488310', '303887', '939173', '331413', '905657', '833617', '170794', '094486', '551394', '943693', '147970', '400196', '537505', '367493', '117178', '675840', '868721', '519081', '735564', '401733', '915348', '169233', '324651', '958675', '368753', '861460', '401341', '343222', '794373', '816374', '535119', '188234', '577779', '097792', '729303', '782637', '148159', '830641', '716890', '397853', '871196', '277603', '749226', '839595', '131852', '409432', '810698', '456030', '529185', '758823', '265024', '051041', '699031', '737269', '139340', '730977', '249786', '039931', '055669', '100107', '653178', '279773', '336550', '332847', '685485', '423269', '193536', '890062', '377637', '595777', '412134', '322736', '546929', '616370', '767332', '781184', '920944', '851005', '258850', '064083', '051202', '427711', '359855', '540928', '314284', '085261', '880969', '649699', '064881', '705423', '646927', '252556', '272007', '217511', '620286', '229724', '108865', '124636', '231417', '961201', '658432', '775416', '246027', '854036', '687762', '389097', '013153', '417085', '919198', '988711', '488665']

  // const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
  // const splittedString = file.split(/\r?\n|\r|\n/g);
  // console.log(splittedString);

  ////////////////////////////////////////////////////////////////////////////////////////////////

  let sortedArray =[];
  function readArray(arr: string[], searchPattern:string) {

      if(sortedArray.length === 142) {
        // console.log(sortedArray);
        return;
      }


    //   const firstDigits =[]
    //   const lastDigits =[]

    // for(let i=0; i<arr.length; i++) {
    //   firstDigits.push(arr[i].slice(0,2))
    //   lastDigits.push(arr[i].slice(4,6))
    // }

    
    for (let i = 0; i < arr.length; i++) {
      // const mainDigitStart = arr[i].slice(0,2);
      // debugger;
      const mainDigitEnd = searchPattern.slice(4,6);
      // firstDigits[i] = aa
      // lastDigits[i] = zz
      let j;

      if(sortedArray.length === 0 ) {
        sortedArray.push(searchPattern);
        j =1
      } else {
        j=0
      }
        // For current index i, check for pattern match
        while (j < arr.length) {
          const checkDigitStart = arr[j].slice(0,2);
          // const checkDigitEnd = arr[j].slice(4,6);
          if(mainDigitEnd === checkDigitStart) {
            // sortedArray.push(searchPattern);
            sortedArray.push(arr[j]);
            arr.splice(arr.indexOf(searchPattern),1)
            arr.splice(j,1)
            // console.log(searchPattern);
            // console.log(arr[j]);

            // console.log(arr);
            // console.log(arrCopy);
            // console.log(sortedArray);
            readArray(arr, sortedArray[sortedArray.length - 1]);
            break;
            
            // console.log(arr[i]);
            // console.log(arr[j]);
            // sortedArray.push(arr[j])//when we find the first match, we put it into sortedArray, adn they do the same to laste digit in sortedArray 
            //or we should start always from teh last digit in original array and then from the last digit in the sorted array??
          }
            j++;
        }
        // If pattern matches at index i
        // if (j === M) {
        //     console.log(`Pattern found at index ${i}`);
        // }

    }
    // sortedArray = firstDigits.concat(lastDigits).sort((a, b) => a.localeCompare(b));
  }

  // readArray(splittedString);

  // readArray(array, array[0]);
    ////////////////////////////////////////////////////////////////////////////////////////////////

  function search(pat:string, txt:string[]) {
    const M = pat.length;
    const N = txt.length;
    // A loop to slide pat[] one by one
    for (let i = 0; i <= N - M; i++) {
        let j = 0;
        // For current index i, check for pattern match
        while (j < M && txt[i + j] === pat[j]) {
            j++;
        }
        // If pattern matches at index i
        if (j === M) {
            console.log(`Pattern found at index ${i}`);
        }
    }
  }
  const txt1 = "AABAACAADAABAABA";
  const pat1 = "AABA";
  // console.log("Example 1:");
  // search(pat1, txt1);
  ////////////////////////////////////////////////////////////////////////////////////////////////
  let sortedDigits =[];
  function readArray2(arr: string[], searchPattern:string) {

    if(sortedArray.length === 142) return;

    
    // for (let i = 1; i < arr.length; i++) {
      // if (i === 142) return;
      // debugger;
      const mainDigitEnd = searchPattern.slice(4,6);
      // firstDigits[i] = aa
      // lastDigits[i] = zz
      let j=0;

      // if(sortedArray.length === 0 ) {
      //   sortedArray.push(searchPattern);
      //   j =1
      // } else {
      //   j=0
      // }
      const searchArray = arr.toSpliced(arr.indexOf(searchPattern),1)

        while (j < searchArray.length) {
          const checkDigitStart = searchArray[j].slice(0,2);
          if(mainDigitEnd === checkDigitStart) {
            sortedDigits.push(searchArray[j]);
            const newArray = searchArray.toSpliced(j,1)
            // console.log(newArray);
            // console.log(searchArray[j]);
            readArray2(newArray, searchArray[j]);
            break;
            
            // console.log(arr[i]);
            // console.log(arr[j]);
            // sortedArray.push(arr[j])//when we find the first match, we put it into sortedArray, adn they do the same to laste digit in sortedArray 
            //or we should start always from teh last digit in original array and then from the last digit in the sorted array??
          }
            j++;
        }
        // If pattern matches at index i
        // if (j === M) {
        //     console.log(`Pattern found at index ${i}`);
        // }
        return sortedDigits;

    }
    // console.log(sortedIndexes);
    // sortedArray = firstDigits.concat(lastDigits).sort((a, b) => a.localeCompare(b));
  // }

  // readArray(splittedString);

  const result = readArray2(array, array[0]);
  console.log(result);
//run the function with each digit in the original array and the longest one will be the answer (instead of array[0] will be array[i])
  ////////////////////////////////////////////////////////////////////////////////////////////////




  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {/* <h1>{file}</h1> */}
          {/* <p>{data.content}</p> */}
        </div>
      </main>
    </div>
  );
}
