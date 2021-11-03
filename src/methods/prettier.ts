import { PackageConfigOptions } from '../types';
import { bash, saveFile } from '../utils';

const prettierSetup = async (options: PackageConfigOptions) => {
  await bash('yarn', ['add', 'prettier', '-D', '-W']);
  await bash('yarn', ['add', 'eslint-config-prettier', '-D', '-W']);
  await saveFile(`.prettierrc.json`, `{}`);
};

export {
  prettierSetup
}
