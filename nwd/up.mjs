import * as path from 'path';
import { access, readdir, stat } from 'node:fs/promises';
import { messageEmitter } from '../messageEmmiter.mjs';
import { getCurrentDir, setCurrentDir } from '../data.mjs';


export function up() {
    const currentDir = path.resolve(getCurrentDir(), '..');
    setCurrentDir(currentDir);
    messageEmitter.emit('currentDir');
}


export  const cd = async (dest) => {
    try {
        const newPath = path.resolve(getCurrentDir(), dest);
        await access(newPath);
        setCurrentDir(newPath);
        messageEmitter.emit('currentDir');
        
    } catch (error) {
        messageEmitter.emit('operationFailed');
    }
}

export const ls = async () => {

    try {
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
            sorted => {
                messageEmitter.emit('message', ()=> console.table(sorted));
            }
            
            
            );
       
    } catch (error) {
        messageEmitter.emit('operationFailed');
    }
}