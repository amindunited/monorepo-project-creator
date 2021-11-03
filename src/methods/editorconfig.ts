import { PackageConfigOptions } from '../types';
import { copyFile } from "../utils";

const editorConfigSetup = async (options: PackageConfigOptions) => {
  await copyFile(`${options.templateSrc}/.editorconfig`, `./.editorconfig`);
};

export {
  editorConfigSetup
}
