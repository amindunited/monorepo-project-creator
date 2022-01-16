import path from 'path';
import { promises } from 'fs';

const { writeFile } = promises;

const saveFile = async (url: string, contents: string) => {

  const localPath = path.resolve(process.cwd(), url);
  await writeFile(localPath, contents);

};

export {
  saveFile
};