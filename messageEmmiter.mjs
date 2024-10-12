import {EventEmitter} from 'node:events';
import { getCurrentDir, setCurrentDir } from './data.mjs';

class MessageEmitter extends EventEmitter {}

export const messageEmitter = new MessageEmitter();
messageEmitter.on('greeting', (user) => {
    console.log(`Welcome to the File Manager, ${user}!`);
    messageEmitter.emit('currentDir');
});

messageEmitter.on('goodbye', (user) => {
    console.log(`Thank you for using File Manager, ${user}, goodbye!`)});

messageEmitter.on('currentDir', () => {
    console.log(`You are currently in ${getCurrentDir()}`);
   
});

messageEmitter.on('invalidInput', () => {
    console.log(`Invalid input`);
    messageEmitter.emit('currentDir');
});

messageEmitter.on('operationFailed', () => {
    console.log(`Operation failed`);
    messageEmitter.emit('currentDir');
});


messageEmitter.on('message', (cb) => {
    cb();
    messageEmitter.emit('currentDir');
});

messageEmitter.on('text', (text) => {
    console.log(text);
});



   