import { PackageConfigOptions } from '../types';
import { copyFile } from '../utils';

const browserListSetup = async (options: PackageConfigOptions) => {
  await copyFile(`${options.templateSrc}/.browserslistrc`, `./.browserslistrc`);
}

export {
  browserListSetup
}
