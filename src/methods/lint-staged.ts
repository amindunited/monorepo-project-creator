import { PackageConfigOptions } from '../types';
import { bash, copyFile, loadFile, saveFile } from '../utils';

const lintStagedSetup = async (options: PackageConfigOptions) => {

  await bash('npx', ['mrm@2', 'lint-staged']);

  await copyFile(`${options.templateSrc}/lint-staged.config.js`, `./lint-staged.config.js`);

  console.log(`⚠️ lint-staged config will now be removed from package.json`);

  const pkg = await loadFile(`./package.json`).then(contents => JSON.parse(contents));

  // Delete the lint staged config from the package.json
  delete pkg["lint-staged"];

  await saveFile(`./package.json`, JSON.stringify(pkg, null, 2));

};

export {
  lintStagedSetup
}
