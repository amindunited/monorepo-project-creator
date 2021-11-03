import { PackageConfigOptions } from '../types';
import { promises } from 'fs'

import { bash, copyFile } from '../utils';

const { appendFile, readFile, writeFile } = promises;

const communityDocsSetup = async (options: PackageConfigOptions) => {
  console.log(`     README`);
  await bash('npx', ['readme-md-generator', '-y']).catch(() => {
    console.error('README was not created');
  });

  console.log(`     Code of Conduct`);
  await copyFile(`https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md`, `./CODE_OF_CONDUCT.md`);

  console.log(`     Contributing Guide`);
  await copyFile(`https://raw.githubusercontent.com/bitprophet/contribution-guide.org/master/index.rst`, `./CONTRIBUTING.md`);

};

export {
  communityDocsSetup
}
