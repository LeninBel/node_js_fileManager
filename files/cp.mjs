import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { pipeline }  from 'node:stream/promises';
import { exec } from '../executor.mjs';

export const cp = async (pathToFile, pathToDirectory) => {


   await exec(async () => {
    const currentDir = getCurrentDir();
    const pathResolved = path.resolve(currentDir, pathToFile);
    await access(pathResolved);
    const {base}= path.parse(pathResolved);
    const pathToCopy = path.resolve(currentDir, pathToDirectory, base);

   const readableStream = fs.createReadStream(pathResolved);
   const writtableStream = fs.createWriteStream(pathToCopy);
   await pipeline(readableStream, writtableStream);
   });
}