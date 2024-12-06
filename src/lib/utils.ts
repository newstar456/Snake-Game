import { promises as fs } from 'fs';


export default async function findString() {

    const file = await fs.readFile(process.cwd() + '/src/constants/text', 'utf8');
    console.log(file);
    const splittedString = file?.split(/\r?\n|\r|\n/g);
    return splittedString;
 }


