import { PackageConfigOptions } from '../types';
import { bash } from '../utils';

const typescriptSetup = async (options: PackageConfigOptions) => {
  // The `-W` installs it to the 'root' workspace.
  await bash('yarn', ['add', 'typescript', '-D', '-W']);
  await bash('npx', ['tsc', '--init']);
};

export {
  typescriptSetup
}
