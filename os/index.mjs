import * as os from 'os';
import { messageEmitter } from '../messageEmmiter.mjs';


export const oss = (arg) => {

switch (arg) {
    case '--EOL': {
        messageEmitter.emit('message', ()=> console.log(JSON.stringify(os.EOL)));
        break;
    }

    case '--homedir': {
        messageEmitter.emit('message', ()=> console.log(os.homedir()));
        break; 
    }

    case '--username': {
        messageEmitter.emit('message', ()=> console.log(os.userInfo().username));
        break; 
    }

    case '--architecture': {
        messageEmitter.emit('message', ()=> console.log(os.arch()));
        break; 
    }

    case '--cpus': {
        const cpusData = os.cpus();
        messageEmitter.emit('text', `Amount of Cpus: ${cpusData.length}`);
        const outputCpusData = cpusData.map(({ model, speed }) => {
            const clockRate = speed > 10 ? speed / 1000 : speed;
            return { model, clockRate };
        });

        messageEmitter.emit('message', ()=> console.log(outputCpusData));
        break; 
    }

    default:
        {
            messageEmitter.emit('invalidInput');
            break;
        }
        
}
}