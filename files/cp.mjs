import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { messageEmitter } from '../messageEmmiter.mjs';
import { pipeline }  from 'node:stream/promises';

export const cp = async (pathToFile, pathToDirectory) => {
   try {
     const currentDir = getCurrentDir();
     const pathResolved = path.resolve(currentDir, pathToFile);
     await access(pathResolved);
     const {base}= path.parse(pathResolved);
     const pathToCopy = path.resolve(pathToDirectory, base);

    const readableStream = fs.createReadStream(pathResolved);
    const writtableStream = fs.createWriteStream(pathToCopy);

    await pipeline(readableStream, writtableStream);
    messageEmitter.emit('currentDir');

   } catch (error) {
    console.log(error);
    messageEmitter.emit('operationFailed');
   }
}