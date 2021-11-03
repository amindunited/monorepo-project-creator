import { NodePlopAPI } from 'plop';
import * as path from 'path';
import { execSync } from 'child_process'; // .(

export default (plop: NodePlopAPI) => {
  // The Directory that contains the JS/TS files
  const basePath = `packages`;

  const getComponentNameFromPath = (path: string) => path.split('/').pop();

  // Adds `name` variable based on the `path` answer
  plop.setActionType('modifyPrompts', (answers: any) => {
    answers.name = getComponentNameFromPath(answers.path);
    return answers;
  });

  const componentPrompts = [
    {
      type: 'input',
      name: 'path',
      message: 'Enter Component Name (including path)...',
    },
  ];

  const componentActions = (folder: string) => [
    {
      type: 'modifyPrompts',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/index.ts`,
      templateFile: 'plop-templates/component/main.index.ts.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/jest.config.js`,
      templateFile: 'plop-templates/component/jest.config.js.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/package.json`,
      templateFile: 'plop-templates/component/package.json.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/README.md`,
      templateFile: 'plop-templates/component/README.md.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/tsconfig.json`,
      templateFile: 'plop-templates/component/tsconfig.json.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/src/index.ts`,
      templateFile: 'plop-templates/component/index.ts.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/src/{{name}}.tsx`,
      templateFile: 'plop-templates/component/component.tsx.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/src/{{name}}.css.ts`,
      templateFile: 'plop-templates/component/component.css.ts.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/src/{{name}}.test.tsx`,
      templateFile: 'plop-templates/component/component.test.tsx.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/${folder}/{{path}}/src/{{name}}.stories.tsx`,
      templateFile: 'plop-templates/component/component.stories.tsx.hbs',
    },
    // async (responses:any) => {
    //   execSync(`cd ./playroom && yarn add @amu\/${responses.name.toLowerCase()}`);
    //   // execSync(`echo 'something'`);
    //   return `Added ${responses.name} to the playroom project`;
    // }
  ];

  plop.setGenerator('Common Component', {
    description: 'Common component in `components` folder',
    prompts: [
      ...componentPrompts,
    ],
    actions: responses => {
      const folder = ''; // 'components';

      // const actions = [
      //   ...componentActions(folder),
      //   {
      //     type: 'modify',
      //     path: `${basePath}/${folder}/index.ts`,
      //     transform: (fileContent: string, { name }: { name: string }) =>
      //       fileContent
      //         .split('\n')
      //         .filter((line) => line !== '')
      //         .concat(`export * from './${name}';`)
      //         .sort()
      //         .reduce((acc, line) => `${acc}${line}\n`, ''),
      //   }
      // ];

      // actions.push({
      //   type: 'add',
      //   path: `${basePath}/${folder}/{{path}}/{{name}}/{{name}}.stories.tsx`,
      //   templateFile: 'plop-templates/component/component.stories.hbs',
      // });
      const actions = componentActions(folder);
      return actions;
    },
  });

};
