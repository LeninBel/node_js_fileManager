import * as os from 'os';
import { messageEmitter } from '../messageEmmiter.mjs';
import { exec } from '../executor.mjs';


export const oss = (arg) => {

switch (arg) {
    case '--EOL': {
        exec(() => {
            messageEmitter.emit('text', JSON.stringify(os.EOL));
        })

        break;
    }

    case '--homedir': {

        exec(() => {
            messageEmitter.emit('text', os.homedir());
        })

        break; 
    }

    case '--username': {

        exec(() => {
            messageEmitter.emit('text', os.userInfo().username);
        })
        break; 
    }

    case '--architecture': {
        exec(() => {
            messageEmitter.emit('text',os.arch());
        })
        break; 
    }

    case '--cpus': {

        exec(() => {
            const cpusData = os.cpus();
            messageEmitter.emit('text', `Amount of Cpus: ${cpusData.length}`);
            const outputCpusData = cpusData.map(({ model, speed }) => {
                const clockRate = speed > 10 ? speed / 1000 : speed;
                return { model, clockRate };
            });
            messageEmitter.emit('text',  outputCpusData);
        })
        break; 
    }

    default:
        {
            messageEmitter.emit('invalidInput');
            break;
        }
        
}
}