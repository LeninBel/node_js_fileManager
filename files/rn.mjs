import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import * as fs from 'node:fs';
import { messageEmitter } from '../messageEmmiter.mjs';
import { rename as fsRename, readdir } from 'node:fs/promises';

export const rn = async (pathToFile, newFileName) => {
    try {
        const currentDir = getCurrentDir();
        const pathResolved = path.resolve(currentDir, pathToFile);
        await access(pathResolved);
        const oldFileName = path.parse(pathResolved).base

        await fsRename(pathResolved, pathResolved.replace(oldFileName, newFileName));
        messageEmitter.emit('currentDir');
    } catch (error) {
        console.log(error);
       messageEmitter.emit(error.message);
    }
}