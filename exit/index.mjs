import * as path from 'path';
import { access, readdir, stat } from 'node:fs/promises';
import { messageEmitter } from '../messageEmmiter.mjs';
import { getCurrentDir, setCurrentDir } from '../data.mjs';
import { exec } from '../executor.mjs';

export function exit() {
    process.exit();
}