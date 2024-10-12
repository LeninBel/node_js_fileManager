import * as os from 'os';


let currentDir = os.homedir();

export const getCurrentDir = () => currentDir;

export const setCurrentDir = (newDir) => {
    currentDir = newDir;
};