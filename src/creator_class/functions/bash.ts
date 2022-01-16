import { promises } from 'fs';
import { spawn } from 'child_process';

const { appendFile, readFile, writeFile } = promises;

const bash = async (cmd: string, args: string[]) => {

  const promise = new Promise((resolve, reject) => {
    const instance = spawn(cmd, args);
    let result = '';

    instance.stdout.on('data', (data) => {
      console.log(`${data}`);
      result += data;
    });

    instance.stderr.on('data', (data) => {
      console.warn(`${data}`);
    });

    instance.on('close', (code) => {
      console.log('bash on close', code);
      if (code === 0) {
        resolve(result);
      } else {
        reject();
      }

    });

  });
  await promise;
};

export {
  bash
}