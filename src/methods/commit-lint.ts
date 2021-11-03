import { PackageConfigOptions } from '../types';
import { bash, copyFile } from '../utils';

const commitLintSetup = async (options: PackageConfigOptions) => {

  await bash('yarn', ['add', '@commitlint/config-conventional', '@commitlint/cli', '-W', '-D']);
  
  // echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
  await copyFile(`${options.templateSrc}/commitlint.config.js`, `./commitlint.config.js`);
  
  // echo "Adding Commit Message Husky hook"
  await bash('npx', ['husky', 'add', '.husky/commit-msg', '"npx --no-install commitlint --edit \"$1\""']).catch(() => {
    console.log(`Error!Error!Error!Error!`);
  });
  
};

export {
  commitLintSetup
}
