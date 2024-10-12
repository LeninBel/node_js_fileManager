import { writeFile } from 'node:fs/promises';
import { messageEmitter } from '../messageEmmiter.mjs';
import * as path from 'path';
import { getCurrentDir } from '../data.mjs';

export const add = async (newFileName) =>{
 try {
    const currentDir = getCurrentDir();
    const pathResolved = path.resolve(currentDir, newFileName);
    await writeFile(pathResolved, '');
    messageEmitter.emit('currentDir');
 } catch (error) {
    messageEmitter.emit('operationFailed');
 }
}