import { messageEmitter } from './messageEmmiter.mjs';

export const exec = async ( cb) => {
    try {
        await cb();
        messageEmitter.emit('currentDir');
    } catch (error) {
        console.log(error.message)
        messageEmitter.emit('operationFailed');
    }
}