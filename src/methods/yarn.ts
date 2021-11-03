import { PackageConfigOptions } from '../types';
import { version } from 'process';
import { promises } from 'fs';
import { bash, saveFile, loadFile } from '../utils';

const { appendFile, readFile, writeFile } = promises;

const yarnWorkspacesSetup = async (options: PackageConfigOptions) => {

  await saveFile(`./.nvmrc`, `${version}`);

  await bash('yarn', ['init', '-y'])
  .catch((err) => console.error(err));

  const packageJSON = await loadFile('./package.json');
  const pkg = JSON.parse(packageJSON);
  pkg.version='0.0.0';
  pkg.private=true;
  pkg.workspaces=["packages/*"];
  await saveFile(`./package.json`, JSON.stringify(pkg, null, 2));

};

export {
  yarnWorkspacesSetup
}