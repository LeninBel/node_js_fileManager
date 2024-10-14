import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import { exec } from '../executor.mjs';
import { createHash }  from 'node:crypto';
import  { readFile } from 'node:fs/promises';
import { messageEmitter } from '../messageEmmiter.mjs';

export const calculateHash = async (fileToPath) => {
    
    await exec(async ()=> {
        const currentDir = getCurrentDir();
        const pathResolved = path.resolve(currentDir, fileToPath);
        await access(pathResolved);
        const content = await readFile(pathResolved);
        const hash = createHash('sha256');
        const res = hash.update(content).digest('hex');
        messageEmitter.emit('text', res);
    });
}