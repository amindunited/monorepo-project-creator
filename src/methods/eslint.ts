import { PackageConfigOptions } from '../types';
import { bash, deleteFile } from '../utils';

const eslintSetup = async (options: PackageConfigOptions) => {

  // Delete the package-lock because we're using yarn
  await deleteFile(`./package-lock.json`);
  await bash('npx', ['eslint', '--init']);

  console.log("⚠️ Even if initialised with yarn, eslint init will install dependencies through npm. So the following script will remove the package-lock.json, and run yarn install.");

  // The EsLint team choose this path: 
  // https://github.com/eslint/eslint/issues/9290#issuecomment-329005046
  // Delete the package-lock (again ... eslint added it) because we're using yarn
  await deleteFile(`./package-lock.json`);
  await bash('yarn', ['install']);
};

export {
  eslintSetup
}
