import path  from 'path';
import { Dirent, promises } from 'fs';

const { readdir } = promises;

const fileTypes = ['.ts'];

const recurseDir = async (dirPath: string): Promise<string[]> => {

  const dirList:Dirent[] = await readdir(path.resolve(process.cwd(), dirPath), { withFileTypes: true });

  const files = dirList.filter((file) => {
    // return fileTypes.includes(path.extname(file.name)) || file.isDirectory();
    return file;
  })
  .reduce(async (prevPromise: Promise<string[]>, file: Dirent) => {

    const prev = await prevPromise;
    const fullPath = path.resolve(process.cwd(), dirPath, file.name);

    if (file.isDirectory()) {
      const children = await recurseDir(fullPath);
      return Promise.resolve([...prev, ...children]);
    }
    return Promise.resolve([...prev, fullPath]);

  }, Promise.resolve([]));

    return files; 
};

export {
  recurseDir
}

// (async () => {
//   const files = await recurseDir('./src');
//   console.log('checking', files);
// })();
