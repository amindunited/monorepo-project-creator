import path from 'path';
import { promises } from 'fs';

const { readFile, writeFile } = promises;

const packageJSON = {
  path: path.resolve(process.cwd(), `./package.json`),
  load: async () => {
    const contents = await readFile(packageJSON.path, { encoding: 'utf-8'});
    return JSON.parse(contents);
  },
  write: async (contents: string) => {
    return await writeFile(packageJSON.path, JSON.stringify(contents, null, 2));
  }
};

export * from './append-to-file';
export * from './bash';
export * from './copy-file';
export * from './delete-file';
export * from './json-file';
export * from './load-file';
export * from './recursive-copy';
export * from './recurse-directory';
export * from './save-file';
export {
  packageJSON,
}