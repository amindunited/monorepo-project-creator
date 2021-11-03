import { PackageConfigOptions } from '../types';
import path from 'path';
import { 
  appendToFile,
  bash,
  loadFile,
  saveFile,
} from '../utils';

import { promises } from 'fs';
const { access } = promises;

const gitSetup = async (options: PackageConfigOptions) => {
  const cwd = process.cwd();

  await access(path.resolve(cwd, './.git'))
    .catch(async () => {
      await bash('git', ['init']).catch((err) => console.error(err));
      await bash('git', ['branch', '-m', 'main']).catch((err) => console.error(err));
    });

  console.log(`Adding a .gitignore file`);
  
  await access(path.resolve(cwd, './.gitignore'))
    .catch(async () => {
      await loadFile(`https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore`)
        .then(data => saveFile(`.gitignore`, data))
        .then(data => appendToFile(`.gitignore`, `\n\n.eslintcache\n`))
        .catch(() => false);
    });
};

export {
  gitSetup
}
