import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { up as moveUp, cd as changeDir, ls as listDir} from './nwd/up.mjs';
import { validate } from './validator.mjs';
import { cat as catFile, add as addFile, rn as rnFile,  cp as cpFile, mv as mvFile, rm as rmFile} from './files/index.mjs';
import { oss} from './os/index.mjs';
import { calculateHash} from './hash/index.mjs';
import { compress as compressBr, decompress as decompressBr} from './compress/index.mjs';
import { exit} from './exit/index.mjs';

export const rl = createInterface({ input: stdin, output: stdout });

const operations = {
    up: moveUp,
    cd: changeDir,
    ls: listDir,
    cat: catFile,
    add: addFile,
    rn: rnFile,
    cp: cpFile,
    mv: mvFile,
    rm: rmFile,
    os: oss,
    hash: calculateHash,
    compress: compressBr,
    decompress: decompressBr,
    [".exit"]: exit,
}

rl.on('line', async (value) => {

    if(validate(value)) {
        const [command, ...args] = value.split(' ');
        await operations[command](...args);
    }
   
    rl.prompt(true);
});
