// import findString from '../lib/utils'

// const string = findString()

// export default string;


// console.log(findString);

////////////////////////////////////////////////////////////////////////

import { promises as fs } from 'fs';


export default async function findString() {

    // const file = await fs.readFile(process.cwd() + '/src/constants/text', 'utf8');
    const file2 = await fs.readFile(process.cwd() + '/app/dataJSON.json', 'utf8');
    const data = JSON.parse(file2);
    // console.log(file);
    // const splittedString = file?.split(/\r?\n|\r|\n/g);
    return data;
 }