import path from 'path';
import { promises } from 'fs';
import { copyFile, recurseDir } from '.';

const { mkdir } = promises;

const recursiveCopy = async (srcPath: string, destPath: string) => {

  const fullSrcPath = path.resolve(process.cwd(), srcPath);
  const fullDestPath = path.resolve(process.cwd(), destPath);

  const srcFiles = await recurseDir(fullSrcPath)
    .catch((err) => {
      console.error(`Error Reading ${fullSrcPath}`, err);
      return [];
    });

  const copies = await [...srcFiles].reduce(async (prevPromise: Promise<string[]>, file: string) => {

    const prev = await prevPromise;
    const dest = path.resolve(process.cwd(), file.replace(fullSrcPath, fullDestPath));

    console.log('copy file from', file);

    // ensure that the destination exists
    await mkdir(path.dirname(dest), { recursive: true }).catch(() => { });
    await copyFile(file, dest);
    return Promise.resolve([...prev, dest]);

  }, Promise.resolve([]));
};

export {
  recursiveCopy
}