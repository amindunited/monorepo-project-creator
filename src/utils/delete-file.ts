import path from 'path';
import { promises } from 'fs';

const { unlink } = promises;

const deleteFile = async (url: string) => {

  const localPath = path.resolve(process.cwd(), url);
  await unlink(localPath);

};

export {
  deleteFile
};