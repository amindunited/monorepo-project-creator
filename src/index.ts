import { PackageConfig } from './types';
/**
 * TODOS:
 * 
 * 1. This should be an npx package
 * 2. There should be a browser based config form
 * 3. 'Methods/' should be renamed
 *      a) userConfigs/
 *      b) libraryScripts/
 * 3. Each `method` 
 * 3. each `method` should accept config / overrides
 * 
 */


/**

{
  root: {

  },
  package: {
    commands: {
      pre: [],
      post: []
    },
    configFiles: [],
    json: [
      {
        file: ''.
        add: [],
        remove: [],
        replace: [],
      }
    ],
    assets: [],
    devDependencies: [],
    dependencies: [],
  }
}

*/


/*

  actions:

    run command

    install dev dep

    install dep

    create config file (copy)

    update package.json
      - add prop
      - add script
      - delete [].[]

    add file(s)

    remove file(s)


  {
    before: {},
    main: {},
    after: {},
  }

*/

/*

  what if every thing was single steps...

  where a step is:

  type Step = {
    action: install_dep | install_dev_dep | run_cmd | add_to_jsonFile | delete_from_jsonFile | add_file | copyFile(s) | delete_file,
    args: [],
    before: cmd
    after: cmd
  };

  GIT: {
    description: 'Git set up',
    steps: [{}];
  }

*/


import {
  browserListSetup,
  commitLintSetup,
  commitizenSetup,
  communityDocsSetup,
  editorConfigSetup,
  huskySetup,
  lernaSetup,
  lintStagedSetup,
  gitSetup,
  plopSetup,
  prettierSetup,
  storybookSetup,
  typescriptSetup,
  yarnWorkspacesSetup,
  nextJsSetup
} from './methods';
import path from 'path/posix';
import { promises } from 'fs';
const { mkdir } = promises;

const TOGGLES = {
  GIT: true,
  YARN: true,
  COMMUNITY: true,
  TYPESCRIPT: true,
  BROWSER_LIST: false,
  EDITORCONFIG: true,
  PRETTIER: true,
  HUSKY: true,
  LINTSTAGED: true,
  COMMITLINT: true,
  COMMITIZEN: true,
  LERNA: false,
  PLOP: true,
  NEXTJS: false,
  STORYBOOK: false,
};

const defaultOptions = {
  templateSrc: path.resolve(path.dirname(__filename), `./templates/`)
};

type PackageFnConfigsObject = { [key: string]: PackageConfig; };
const packageFnConfigs:PackageFnConfigsObject = {
  GIT: {
    name: `Git`,
    toggle: TOGGLES.GIT,
    fn: gitSetup,
    options: {}
  },
  YARN: {
    name: `Yarn`,
    toggle: TOGGLES.YARN,
    fn: yarnWorkspacesSetup,
    options: {}
  },
  COMMUNITY: {
    name: `Community Docs`,
    toggle: TOGGLES.COMMUNITY,
    fn: communityDocsSetup,
    options: {}
  },
  TYPESCRIPT: {
    name: `Typescript`,
    toggle: TOGGLES.TYPESCRIPT,
    fn: typescriptSetup,
    options: {}
  },
  BROWSERLIST: {
    name: `Browser List`,
    toggle: TOGGLES.BROWSER_LIST,
    fn: browserListSetup,
    options: {}
  },
  EDITORCONFIG: {
    name: `Editor Config`,
    toggle: TOGGLES.EDITORCONFIG,
    fn: editorConfigSetup,
    options: {}
  },
  PRETTIERCONFIG: {
    name: `Prettier Config`,
    toggle: TOGGLES.PRETTIER,
    fn: prettierSetup,
    options: {}
  },
  HUSKY: {
    name: `Husky`,
    toggle: TOGGLES.HUSKY,
    fn: huskySetup,
    options: {}
  },
  LINTSTAGED: {
    name: `Lint Staged`,
    toggle: TOGGLES.LINTSTAGED,
    fn: lintStagedSetup,
    options: {}
  },
  COMMITLINT: {
    name: `Commit Lint`,
    toggle: TOGGLES.COMMITLINT,
    fn: commitLintSetup,
    options: {}
  },
  COMMITIZEN: {
    name: `Commitizen`,
    toggle: TOGGLES.COMMITIZEN,
    fn: commitizenSetup,
    options: {}
  },
  LERNA: {
    name: `Lerna`,
    toggle: TOGGLES.LERNA,
    fn: lernaSetup,
    options: {}
  },
  PLOP: {
    name: `Plop`,
    toggle: TOGGLES.PLOP,
    fn: plopSetup,
    options: {}
  },
  NEXTJS: {
    name: `NextJs`,
    toggle: TOGGLES.NEXTJS,
    fn: nextJsSetup,
    options: {}
  },
  STORYBOOK: {
    name: `Storybook`,
    toggle: TOGGLES.STORYBOOK,
    fn: storybookSetup,
    options: {}
  }  
  // @todo
  // Playroom
  // Github Pages


};

const executeStep = async (config: PackageConfig) => {
  console.log('########################################');
  console.log('##');
  console.log(`${config.name}`);
  config.toggle ? await config.fn(config.options) : console.log(` ... Skipping ${config.name}`);
  console.log('##');
  console.log('########################################');
};

const run = async () => {

  await mkdir(`./project-name`);
  process.chdir(`./project-name`);

  Object.keys(packageFnConfigs).reduce(async (prevPromise: Promise<string[]>, configKey: string) => {

    const prev = await prevPromise;

    const key = configKey as keyof typeof packageFnConfigs
    const config = packageFnConfigs[key];
    const withDefaults = {
      ...config,
      options: {
        ...defaultOptions,
        ...config.options
      }
    };

    const c = await executeStep(withDefaults);
    
    return Promise.resolve([...prev, config.name]);

  }, Promise.resolve([]));

};

run().then(() => {
  console.log('Finished');
});
