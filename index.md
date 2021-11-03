# Project Setup

## Table of Contents

1. [GitIgnore](#1-git-ignore)

2. [Node Version](#2-nvmrc)

3. [Community Docs](#3-community-docs)

   a. [Readme](#readme-md)

   b. [Code of Conduct](#code-of-conduct)

   c. [Contributing](#contributing-guide)

4. [Editor Config](#4-editor-config)

5. [Browser List](#5-browser-list)

6. [EsLint](#6-eslint)

7. [Prettier](#7-prettier)

8. [Lint Staged](#8.lint-staged)

9. [Lint Staged](#9.husky)

Create a new project, and check it out.

## 1. Git Ignore

Adding .gitignore file from the start so your computer doesn't burn your lap indexing something it shouldn't

```
curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore -o .gitignore
```

Add the esLint Cache to the .gitignore

```BASH
cat << EOF >> .gitignore

.eslintcache

EOF
```

## 2. .nvmrc

Use an nvmrc to make sure you're building from the same node version everywhere.

```
node -v > .nvmrc
```

## 3. Community Docs

Help yourself, and others, by giving some info on the Code, the project, and how to help.

### README

```BASH
npx readme-md-generator
```

[readme-md-generator](https://github.com/kefranabg/readme-md-generator)

### Code of Conduct

```BASH
curl https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md -o ./CODE_OF_CONDUCT.md
```

### Contributing Guide

```BASH
curl https://raw.githubusercontent.com/bitprophet/contribution-guide.org/master/index.rst -o ./CONTRIBUTING.md
```

## 4. Editor Config

```BASH
echo "Creating an Editorconfig"

cat > .editorconfig <<EOL
# http://editorconfig.org

root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
insert_final_newline = false

EOL
```

## 5. Browser List

The config to share target browsers and Node.js versions between different front-end tools

```BASH
## BrowsersList
echo "Configuring Browsers List"

cat > .browserslistrc <<EOL
# Browsers List Defaults

defaults
not IE 11
maintained node versions
EOL
```

## 6. Eslint

`npx eslint --init`

Adding typescript and prettier to eslint config.
Note, that neither Typescript, nor Prettier are installed at this point, so this will likely cause an error.

```BASH
cat > .eslintrc.js <<EOL
module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    "airbnb-base",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    "@typescript-eslint",
  ],
  rules: {
  },
};
EOL
```

Needed Typescript

```
npm install typescript --save-dev
```

## 7. Prettier

```BASH
echo "installing prettier"

npm install prettier --save-dev --save-exact
npm install eslint-config-prettier --save-dev

echo "Configuring prettier"
echo {}> .prettierrc.json
```

## 8. Lint Staged

```BASH
npx mrm@2 lint-staged
```

```BASH
cat > lint-staged.config.js <<EOL
module.exports = {
  "*.js": "eslint --cache --fix",
  "*.{js,css,md}": "prettier --write"
}
EOL
```

- ⚠️ lint-staged config should now be removed from package.json

## 9. Husky

Husky will likely have been installed by mrm@2 while installing `lint-staged`

```BASH
npm install husky --save-dev
```

or

```BASH
yarn add husky -d
```

The Husky docs suggest creating a prepare script like this:

```BASH
npm set-script prepare "husky install"
```

But if that doesn't work ... just add a script to the package.json for it

```JSON
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

```BASH
npm run prepare
```

or

```BASH
yarn run prepare
```

Add our hooks

```BASH
npx husky add .husky/prepare-commit-msg "exec < /dev/tty && git cz --hook || true"
```

```BASH
npx husky add .husky/pre-commit "npx --no-install lint-staged"
```

```BASH
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"$1\""
```

To skip commit CI when commits already have a Message, add this to prepare commmit message:

```BASH
## "$2" is the `-m` or `-message` flag.
# If the message flag has been NOT set, use commitizen
if [ "$2" != "message" ];then
    exec < /dev/tty && node_modules/.bin/cz --hook "$1" "$2" "$3" || true
fi
```

<!-- `npx husky add .husky/commit-msg "commitlint -E HUSKY_GIT_PARAMS"` -->

```BASH
git add .
```

- ⚠️ lint-staged, and husky configs should now be removed from package.json

## 10. Yarn

```BASH
yarn init
```

Add Yarn workspaces to the package.json

```JSON
  "workspaces": [
    "packages/*"
  ],
```

## 11. Lerna Setup

package.json

```JSON
{
  "scripts": {
    "version": "lerna version --conventional-commits --yes",
    "publish": "echo 'this WOULD run `lerna publish from-git`'"
  }

}
```

lerna.json

```BASH
{
  "packages": [
    "packages/*"
  ],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "0.0.0"
}
```

```BASH
yarn add lerna -d -W
```

## VS Code Auto Format

### In built Auto Formatting

```BASH
mkdir  ./.vscode

touch ./.vscode/settings.json

cat > ./.vscode/settings.json <<EOF
{
  "editor.formatOnSave": true
}
EOF
```

### VS Code Prettier

[Prettier Formatter for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

```BASH
ext install esbenp.prettier-vscode
```

```BASH
# ./.vscode/setting.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### VS Code Extensions

```BASH
cat > ./.vscode/extensions.json <<EOF
{
  "recommendations": [
    "streetsidesoftware.code-spell-checker",
    "alexkrechik.cucumberautocomplete",
    "editorconfig.editorconfig",
    "dbaeumer.vscode-eslint",
    "orta.vscode-jest",
    "ms-vsliveshare.vsliveshare",
    "esbenp.prettier-vscode",
    "syler.sass-indented",
    "eamodio.gitlens",
    "graphql.vscode-graphql",
    "mikestead.dotenv",
    "whatwedo.twig"
  ]
}
EOF
```
