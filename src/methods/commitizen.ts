import { PackageConfigOptions } from '../types';
import { bash, copyFile, deleteFile, loadFile, saveFile } from '../utils';

const commitizenSetup = async (options: PackageConfigOptions) => {

  // - ⚠️ Had Some trouble with Commitizen, yarn husky...
  
  // The commitizen init had trouble with installing via Yarn (Root Workspace issue)
  // So
  
  // 1. npx and npm for init
  await bash('npx', ['commitizen', 'init', 'cz-conventional-changelog', '--save-dev', '--save-exact']);
  
  // 2. remove package-lock.json and update yarn-lock
  await deleteFile(`./package-lock.json`);

  await bash('yarn', ['install']);
  
  // 3. add commitizen to the root workspace
  await bash('yarn', ['add', 'commitizen', '-D', '-W']);
  
  // echo "create commitizen config with conventional-changelog"
  copyFile(`${options.templateSrc}/.czrc`, `.czrc`);
  
  // echo "Remove commitizen config from Package,json"
  const pkg = await loadFile(`./package.json`).then(contents => JSON.parse(contents));
  delete pkg['config'];
  await saveFile(`./package.json`, JSON.stringify(pkg, null, 2));

  // Create an empty prepare-commit-rule
  await bash('npx', ['husky', 'add', '.husky/prepare-commit-msg', '""']);

  // Append the multi line condition
  await copyFile(`${options.templateSrc}/.husky-prepare-commit-msg`, `./.husky/prepare-commit-msg`);

};

export {
  commitizenSetup
}
