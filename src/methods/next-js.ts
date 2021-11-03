import { PackageConfigOptions } from '../types';
import { bash, jsonFile } from '../utils';

const nextJsSetup = async (options: PackageConfigOptions) => {

  await bash('yarn', ['create', 'next-app', '--typescript website']);

  const packageJson = await jsonFile(`./website/package.json`);
  const pkg = await packageJson.content;
  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;

  await packageJson.save(pkg);

  console.log('curr', process.cwd());
  const parentPackageJson = await jsonFile(`./package.json`);
  const parentPkg = parentPackageJson.content;

  // If the Parent project has 'workspaces'...add this directory
  if (parentPkg['workspaces']) {
    parentPkg['workspaces'].push('website/*');
  }
  await parentPackageJson.save(parentPkg);

};

export {
  nextJsSetup
}