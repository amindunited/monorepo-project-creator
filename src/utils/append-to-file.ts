import path from 'path';
import { promises } from 'fs';

const { appendFile } = promises;

const appendToFile = async (url: string, contents: string) => {

  const localPath = path.resolve(process.cwd(), url);
  await appendFile(localPath, contents);

};

export {
  appendToFile
};