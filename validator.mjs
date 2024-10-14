import { messageEmitter } from './messageEmmiter.mjs';

export const validate = (command) => {
  if(command === 'up' || command === 'ls') return true;

  const regex = /(cd|cat|add|rm|os|hash) (\S+)$/gm;
  if(regex.test(command)) return true;

  const regex2 = /(rn|cp|mv) (\S+) (\S+)$/gm;;
  if(regex2.test(command)) return true;

  messageEmitter.emit('invalidInput');
}