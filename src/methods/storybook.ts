import { PackageConfigOptions } from '../types';
import path from 'path';
import { promises } from 'fs';
import { bash, jsonFile, recursiveCopy } from '../utils';

const { mkdir } = promises;

const storybookSetup = async (options: PackageConfigOptions) => {
  const rootDir = process.cwd();
  console.log('root dir', rootDir);

  await mkdir(path.resolve(process.cwd(), './storybook'));

  process.chdir(`./storybook`);

  await bash('yarn', ['init', '-y']);

  const packageJson = await jsonFile(`./package.json`);
  const pkg = packageJson.content;
  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;

  !Boolean(pkg['scripts']) ? pkg['scripts'] = {} : null;

  pkg['scripts']['start'] = "start-storybook";
  pkg['scripts']['storybook'] = "start-storybook -p 6006";
  pkg['scripts']['build-storybook'] = "build-storybook";
  pkg['workspaces'].push('storybook');

  await packageJson.save(pkg);

  await bash('yarn', ['add', 'react', 'react-dom']);
  await bash('yarn', [
    'add',
    '-D',
    '@babel/core',
    '@storybook/addon-actions',
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/react',
    '@types/react',
    'babel-loader',
    'eslint',
    'eslint-config-next',
    'typescript'
  ])


  // Create the StorybookConfig Directory
  await mkdir(`./.storybook`);

  // Return to Root Dir
  process.chdir(rootDir);


  await recursiveCopy(`${options.templateSrc}/.storybook`, `./storybook/.storybook`);

}

export {
  storybookSetup
}