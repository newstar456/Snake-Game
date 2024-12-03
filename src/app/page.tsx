// import Image from "next/image";
import { promises as fs } from 'fs';

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
  const splittedString = file.split(/\r?\n|\r|\n/g);
  console.log(splittedString);

  function search(pat:string, txt:string) {
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
  console.log("Example 1:");
  search(pat1, txt1);




  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          <h1>{file}</h1>
          {/* <p>{data.content}</p> */}
        </div>
      </main>
    </div>
  );
}
