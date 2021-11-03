import { PackageConfigOptions } from '../types';
import { bash, copyFile, jsonFile, loadFile, saveFile } from '../utils';

const lernaSetup = async (options: PackageConfigOptions) => {
  await bash('yarn', ['add', 'lerna', '-D', '-W']);
  await copyFile(`${options.templateSrc}/lerna.json`, `./lerna.json`);

  const packageJson = await jsonFile(`./package.json`);
  const pkg = packageJson.content;

  // const pkg = await loadFile(`./package.json`).then(contents => JSON.parse(contents));
  pkg['scripts']['test'] = `lerna run test --since`;
  pkg['scripts']['version'] = `lerna version --conventional-commits --yes`;
  pkg['scripts']['publish'] = `lerna publish from-git`;
  // await saveFile(`./package.json`, pkg);
  packageJson.save(pkg);
};

export {
  lernaSetup
}
