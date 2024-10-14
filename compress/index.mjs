import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import * as zlib from 'zlib';
import { exec } from '../executor.mjs';
import { pipeline }  from 'node:stream/promises';

export const compress = async (fileToPath, pathToDestination) => {

   await exec(async () => {

    const currentDir = getCurrentDir();
    const pathResolved = path.resolve(currentDir, fileToPath);
    await access(pathResolved);

   const readableStream = fs.createReadStream(pathResolved);
   const writeStream = fs.createWriteStream(path.resolve(currentDir, pathToDestination));
   const brotli = zlib.createBrotliCompress();

   await pipeline(
    readableStream,
    brotli,
    writeStream
   );

   })
}

export const decompress = async (fileToPath, pathToDestination) => {

    await exec(async () => {
 
     const currentDir = getCurrentDir();
     const pathResolved = path.resolve(currentDir, fileToPath);
     await access(pathResolved);
 
    const readableStream = fs.createReadStream(pathResolved);
    const writeStream = fs.createWriteStream(path.resolve(currentDir, pathToDestination));
    const brotli = zlib.createBrotliDecompress();
 
    await pipeline(
     readableStream,
     brotli,
     writeStream
    );
 
    })
 }