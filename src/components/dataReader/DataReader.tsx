import { promises as fs } from 'fs';


export default async function findString() {

    const file = await fs.readFile(process.cwd() + '/src/app/text.txt', 'utf8');
    // const file2 = await fs.readFile(process.cwd() + './dataJSON.json', 'utf8');
    // const data = JSON.parse(file);
    console.log(file);
    // const splittedString = file?.split(/\r?\n|\r|\n/g);
    return file;
 }