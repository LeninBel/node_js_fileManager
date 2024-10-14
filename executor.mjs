import { messageEmitter } from './messageEmmiter.mjs';

export const exec = async ( cb) => {
    try {
        await cb();
        messageEmitter.emit('currentDir');
    } catch (error) {
        messageEmitter.emit('operationFailed');
    }
}