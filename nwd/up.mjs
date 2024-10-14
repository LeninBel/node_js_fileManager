import * as path from 'path';
import { access, readdir, stat } from 'node:fs/promises';
import { messageEmitter } from '../messageEmmiter.mjs';
import { getCurrentDir, setCurrentDir } from '../data.mjs';
import { exec } from '../executor.mjs';

export function up() {
    exec(() => {
        const currentDir = path.resolve(getCurrentDir(), '..');
        setCurrentDir(currentDir);
    });
}


export  const cd = async (dest) => {

    await exec(async () => {
        const newPath = path.resolve(getCurrentDir(), dest);
        await access(newPath);
        setCurrentDir(newPath);
    });
}

export const ls = async () => {

    await exec(async () => {
        const currentDir = getCurrentDir();
        const items = await readdir(currentDir);
        const res =  items.map(async (item) => {
            const itemPath = path.resolve(currentDir, `./${item}`);
            const statItem = await stat(itemPath).then(s => s.isFile());

            return {
                ['Name'] : item,
                ['Type'] : statItem ? 'file' : 'directory',
            }

        });

        await Promise.all(res).then(r=> r.sort((a, b) => a.Type.localeCompare(b.Type))).then(
            console.table
            
            
            );
    });
}