import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import { rm as remove } from 'node:fs/promises';
import { exec } from '../executor.mjs';

export const rm = async (pathToFile) => {

    await exec(async () => {
        const currentDir = getCurrentDir();
        const pathResolved = path.resolve(currentDir, pathToFile);
        await access(pathResolved);
        await remove(pathResolved);
    })
}