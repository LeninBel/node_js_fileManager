import { rl } from './readline.mjs';
import { messageEmitter } from './messageEmmiter.mjs';

let userName='';

function greeting() {
    try{
        const userNameArg = process.argv.find(arg => arg.startsWith('--username='));
        userName=userNameArg.split('=')[1];
    }catch(er){
        console.log(process.argv[2]);
        console.error('"--username" argument is not found. Please use correct argument');
        process.exit(1);
    }

    process.on('exit', ()=> {
        messageEmitter.emit('goodbye',userName );
    });
   
    messageEmitter.emit('greeting',userName );
    rl.prompt(true);
}


greeting();

