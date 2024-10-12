import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { messageEmitter } from '../messageEmmiter.mjs';
import { rm as remove } from 'node:fs/promises';

export const rm = async (pathToFile) => {
    try {
        const currentDir = getCurrentDir();
        const pathResolved = path.resolve(currentDir, pathToFile);
        await access(pathResolved);
        await remove(pathResolved);
        messageEmitter.emit('currentDir');
    } catch (error) {
       messageEmitter.emit(error.message);
    }
}