import { messageEmitter } from './messageEmmiter.mjs';

export const validate = (command) => {
  const regex0 = /^(up|ls|.exit)$/gm;
  if(regex0.test(command)) return true;

  const regex = /^(cd|cat|add|rm|os|hash) (\S+)$/gm;
  if(regex.test(command)) return true;

  const regex2 = /^(rn|cp|mv|compress|decompress) (\S+) (\S+)$/gm;;
  if(regex2.test(command)) return true;

  messageEmitter.emit('invalidInput');
}