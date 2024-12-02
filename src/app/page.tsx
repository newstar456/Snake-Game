// import Image from "next/image";
import { promises as fs } from 'fs';

export default async function Home() {

  const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
  // const file = await fs.readFile(process.cwd() + '/src/app/data.json', 'utf8');
  // const data = JSON.parse(file);



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
