import { PackageConfigOptions } from '../types';
import { bash, jsonFile } from '../utils';

const huskySetup = async (options: PackageConfigOptions) => {
  // await bash('npm',  ['install', 'husky', '--save-dev']);
  await bash('yarn', ['add', 'husky', '-D', '-W']);

  // The Husky docs suggest creating a prepare script like this
  await bash('npm', ['set-script', 'prepare', 'husky install']);

  const packageJson = await jsonFile(`./package.json`);
  console.log('husky packagejson', JSON.stringify(packageJson.content, null, 2));
  // const pkg = packageJson.content;
  // !Boolean(pkg['scripts']) ? pkg['scripts'] = {} : null;
  // pkg['scripts']['prepare'] = 'husky install';
  // await packageJson.save(pkg);

  /**
  // But if that doesn't work ... just add a script to the package.json for it

  {
    "scripts": {
      "prepare": "husky install"
    }
  }
  */

  // await bash('yarn', ['run', 'prepare']).catch(() => {
  //   console.log('yarn run prpare problem???');
  // });

};

export {
  huskySetup
}
