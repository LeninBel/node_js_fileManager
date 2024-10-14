import * as path from 'path';
import { getCurrentDir } from '../data.mjs';
import { access } from 'node:fs/promises';
import { rename as fsRename } from 'node:fs/promises';

import { exec } from '../executor.mjs';

export const rn = async (pathToFile, newFileName) => {
    await exec(async () => {
        const currentDir = getCurrentDir();
        const pathResolved = path.resolve(currentDir, pathToFile);
        await access(pathResolved);
        const oldFileName = path.parse(pathResolved).base
        await fsRename(pathResolved, pathResolved.replace(oldFileName, newFileName));
    })
}