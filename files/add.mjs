import { writeFile } from 'node:fs/promises';
import { exec } from '../executor.mjs';
import * as path from 'path';
import { getCurrentDir } from '../data.mjs';

export const add = async (newFileName) =>{
    await exec(
        async ()=> {
            const currentDir = getCurrentDir();
            const pathResolved = path.resolve(currentDir, newFileName);
            await writeFile(pathResolved, '');
        }
    )
}