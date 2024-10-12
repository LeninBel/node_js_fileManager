import { createInterface } from 'node:readline/promises'
import { stdin, stdout } from 'node:process'
import { up, cd, ls } from './nwd/up.mjs';
import { validate } from './validator.mjs';
import { cat, add , rn,  cp, mv, rm} from './files/index.mjs';
import { oss} from './os/index.mjs';

export const rl = createInterface({ input: stdin, output: stdout });

rl.on('line', async (value) => {

    if(validate(value)) {
        if(value === 'up') {
            up();
        }

        if(value.startsWith('cd ')) {
         await cd(value.split(' ')[1]);
        }

        if(value === 'ls') {
            await ls();
        }

       
        if(value.startsWith('cat ')) {
            await cat(value.split(' ')[1]);
        }

        if(value.startsWith('add ')) {
            await add(value.split(' ')[1]);
        }

        if(value.startsWith('rn ')) {
            const [command, ...args] = value.split(' ');
            await rn(...args);
        }

        if(value.startsWith('cp ')) {
            const [command, ...args] = value.split(' ');
            await cp(...args);
        }

        if(value.startsWith('mv ')) {
            const [command, ...args] = value.split(' ');
            await mv(...args);
        }

        if(value.startsWith('rm ')) {
            const [command, ...args] = value.split(' ');
            await rm(...args);
        }

        if(value.startsWith('os ')) {
         oss(value.split(' ')[1]);
        }
    }
   
    rl.prompt(true);
});
