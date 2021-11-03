import path from 'path';
import { promises } from 'fs';
import { curl } from './curl';

const { readFile } = promises;

const loadFile = async (url: string) => {

  if (url.match(/^https?/) ) {
    return await curl(url)
  } else {
    const localPath = path.resolve(process.cwd(), url);
    const contents = await readFile(localPath, { encoding: 'utf-8'});
    return contents;
  }

};

export {
  loadFile
};
