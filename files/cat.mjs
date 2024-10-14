import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { messageEmitter } from '../messageEmmiter.mjs';

export const cat = async (fileToPath) => {
   try {
     const currentDir = getCurrentDir();
     const pathResolved = path.resolve(currentDir, fileToPath);
     await access(pathResolved);

    const readableStream = fs.createReadStream(pathResolved).setEncoding('utf8');

    let data='';
    readableStream.on('data', (chunk) => {
        data+=chunk;
    });

    readableStream.once('end', () => {
        messageEmitter.emit('message', ()=> console.log(data));
    });

    readableStream.on('error', () => {
        messageEmitter.emit('operationFailed');
    })

   } catch (error) {
    messageEmitter.emit('operationFailed');
   }
}