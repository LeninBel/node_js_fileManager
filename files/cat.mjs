import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { messageEmitter } from '../messageEmmiter.mjs';
import { exec } from '../executor.mjs';

export const cat = async (fileToPath) => {

    await exec(async () => {
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
   
           readableStream.close();
       });
   
       readableStream.on('error', () => {
           messageEmitter.emit('operationFailed');
       })

    })  ;
}