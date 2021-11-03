import { PackageConfigOptions } from '../types';
import path from 'path';
import { bash, copyFile, jsonFile, recurseDir } from '../utils';
import { promises } from 'fs';
import { recursiveCopy } from '../utils/recursive-copy';

const { mkdir } = promises;

const plopSetup = async (options: PackageConfigOptions) => {
  // Install Plop
  await bash('yarn', ['add', 'plop', '-D', '-W']);

  // Add PLop Command to Package.json
  const pkgJson = await jsonFile(`./package.json`);
  const pkg = pkgJson.content;
  if (!pkg['scripts']) { pkg['scripts'] = {}; }
  pkg['scripts']['plop'] = 'plop';
  await pkgJson.save(pkg);

  // Plop File
  await copyFile(`${options.templateSrc}/plopfile.ts`, `./plopfile.ts`);

  const plopTemplatesPath = path.resolve(process.cwd(), `./plop-templates`);
  await mkdir(plopTemplatesPath).catch((err) => {
    console.error(err);
  });

  const plopFilesTemplatesPath = path.resolve(process.cwd(), `${options.templateSrc}/plop-templates`);
  await recursiveCopy(plopFilesTemplatesPath, plopTemplatesPath);

};

export {
  plopSetup
}
