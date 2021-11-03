
echo "
###############################################################
# SOF
# Create Directory & Git init
#
"

echo "Please Enter a Name for the Directory:"

read projectdir

echo "###############################"
echo "a) Creaing $projectdir"

mkdir ./$projectdir && cd $_

echo "Changed Current Directory to:"
pwd


echo "###############################"
echo "b) initialising git:"

git init

echo "###############################"
echo "c) Renaming initial branch to main"

git branch -m main

echo "###############################"
echo "d) Adding a .gitignore file"

curl https://raw.githubusercontent.com/github/gitignore/master/Node.gitignore -o .gitignore

cat << EOF >> .gitignore

.eslintcache

EOF


echo "
#
# EOF
# Create Directory & Git init
###############################################################
"


echo "
###############################################################
# SOF
# Yarn Workspaces
#
"
echo "###############################"
echo "a) NVMRC"

node -v > .nvmrc

echo "###############################"
echo "b) Yarn"

yarn init -y


echo "###############################"
echo "c) Add Workspaces to Package.json"
# This script will make the following modifications to the package.json
#   - mark the project as private.
#   - the yarn workspaces config '"workspaces":["packages/*"]'
#   - set the version to 0.0.0

PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;

  // Set a "workspaces" array of directory path globs for yarn workspaces
  pkg.workspaces=["packages/*"];

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES

echo "
#
# EOF
# Yarn
###############################################################
"

echo "
###############################################################
# SOF
# Community Docs
#
"
# Help yourself, and others, by giving some info on the Code, the project, and how to help.
echo "###############################"
echo "a) README"
npx readme-md-generator

# [readme-md-generator](https://github.com/kefranabg/readme-md-generator)
echo "###############################"
echo "b) Code of Conduct"

curl https://www.contributor-covenant.org/version/2/1/code_of_conduct/code_of_conduct.md -o ./CODE_OF_CONDUCT.md

echo "###############################"
echo "c) Contributing Guide"

curl https://raw.githubusercontent.com/bitprophet/contribution-guide.org/master/index.rst -o ./CONTRIBUTING.md
  

echo "
#
# EOF
# Community Docs
###############################################################
"

echo "
###############################################################
# SOF
# Code Style
#
"

echo "###############################"
echo "a) Typescript"

echo "Adding typescript now becuase it will be needed for setting up typescript linting."

# The `-W` installs it to the 'root' workspace.

yarn add typescript -D -W

echo "###############################"
echo "b) Browser List"

echo "The config to share target browsers and Node.js versions between different front-end tools"

## BrowsersList
echo "Configuring Browsers List"

cat > .browserslistrc <<EOL
# Browsers List Defaults

defaults
not IE 11
maintained node versions
EOL

echo "###############################"
echo "c) Editor Config"

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


echo "###############################"
echo "d) Es Lint"

rm -rf ./package-lock.json

npx eslint --init

# yarn add eslint -D -W
# yarn run eslint --init

echo "⚠️ Even if initialised with yarn, eslint init will install dependencies through npm. So the following script will remove the package-lock.json, and run yarn install."

# The EsLint team choose this path: 
# https://github.com/eslint/eslint/issues/9290#issuecomment-329005046

rm -rf ./package-lock.json && yarn install

echo "###############################"
echo "e) Prettier"

yarn add prettier -D -W
yarn add eslint-config-prettier -D -W

echo "Configuring prettier"
echo {}> .prettierrc.json


echo "
#
# EOF
# Code Style
###############################################################
"

echo "
###############################################################
# SOF
# Git Hooks
#
"

echo "###############################"
echo "a) Husky"

yarn add husky -D -W

# The Husky docs suggest creating a prepare script like this

npm set-script prepare "husky install"

# But if that doesn't work ... just add a script to the package.json for it

# ```JSON
# {
#   "scripts": {
#     "prepare": "husky install"
#   }
# }
# ```
yarn run prepare

echo "###############################"
echo "b) Pre Commit (Lint Staged Files)"

echo "Lint Staged"
npx mrm@2 lint-staged

echo "Creating lint-staged.config"

cat > lint-staged.config.js <<EOL
module.exports = {
  "*.js": "eslint --cache --fix",
  "*.{js,css,md}": "prettier --write"
}
EOL


echo "⚠️ lint-staged config will now be removed from package.json"

PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  // Delete the lint staged config from the package.json
  delete pkg["lint-staged"]

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES


# echo "Pre Commit (Lint Staged Files)"
# echo "Adding pre-commit Husky hook"

# # npx husky add .husky/pre-commit "npx --no-install lint-staged"
# # Lint staged now installs itself and does not add the --no-install flag  ¯\_(ツ)_/¯
# npx husky add .husky/pre-commit ""

echo "###############################"
echo "c) Commit Message (Commit Message Linting)"

echo "Commit Lint"
yarn add @commitlint/{config-conventional,cli} -W -D

echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js

echo "Adding Commit Message Husky hook"
npx husky add .husky/commit-msg "npx --no-install commitlint --edit \"$1\""


echo "###############################"
echo "d) Prepare Commit Message (Commitizen)"

echo "Commitizen"

# - ⚠️ Had Some trouble with Commitizen, yarn husky...

# The commitizen init had trouble with installing via Yarn (Root Workspace issue)
# So
# 1. npx and npm for init
npx commitizen init cz-conventional-changelog --save-dev --save-exact
# 2. remove package-lock.json and update yarn-lock
rm -rf ./package-lock.json && yarn install
# 3. add commitizen to the root workspace
yarn add commitizen -D -W

echo "create commitizen config with conventional-changelog"
cat > .czrc <<EOF
{
  "path": "cz-conventional-changelog"
}
EOF

echo "Remove commitizen config from Package,json"
PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  // Delete the lint staged config from the package.json
  delete pkg["config"]

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES


echo "Adding Prepare Commit Message Husky hook"
# Create an empty prepare-commit-rule
npx husky add .husky/prepare-commit-msg ""

# Append the multi line condition
#
# - This condition will skip the Commitizen CLI
#     if the commit already has a Message
#
cat >> .husky/prepare-commit-msg <<EOF
## "\$2" is the \`-m\` or \`-message\` flag.
# If the message flag has been NOT set, use commitizen 
if [ "\$2" != "message" ];then 
    exec < /dev/tty && node_modules/.bin/cz --hook "\$1" "\$2" "\$3" || true
fi

EOF

echo "
#
# EOF
# Git Hooks
###############################################################
"


echo "
###############################################################
# SOF
# Lerna
#
"

yarn add lerna -D -W

cat > ./lerna.json <<-EOF
{
  "packages": [
    "packages/*"
  ],
  "npmClient": "yarn",
  "useWorkspaces": true,
  "version": "0.0.0",
  "command": {
    "publish": {
      "message": "chore(release): publish",
      "no-private": true
    }
  }
}

EOF

PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  pkg['scripts']['test'] = "lerna run test --since";
  pkg['scripts']['version'] = "lerna version --conventional-commits --yes";
  pkg['scripts']['publish'] = "lerna publish from-git";

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES


echo "
#
# EOF
# Lerna
###############################################################
"


echo "
###############################################################
# SOF
# Plop
#
"

yarn add plop -D -W


PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  pkg['scripts']['plop'] = "plop";

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES

cat > plopfile.ts <<-EOF
import { NodePlopAPI } from 'plop';

export default (plop: NodePlopAPI) => {
  plop.setGenerator('Common Component', {
    description: 'Common component in components folder',
    prompts: [],
    actions: responses => {
      return [{
        type: 'add',
        path: 'checking/check.tsx',
        templateFile: 'plop-templates/check.hbs',
      }]
    }

  }
};
EOF

mkdir ./plop-templates

cat > ./plop-templates/check.hbs <<-EOF
  BAM!
EOF


echo "
#
# EOF
# Plop
###############################################################
"


echo "
###############################################################
# SOF
# NextJs - Project Website
#
"

yarn create next-app --typescript website

cd ./website

PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES

cd ../

echo "
#
# EOF
# NextJs - Project Website
###############################################################
"

echo "
###############################################################
# SOF
# Storybook
#
"
mkdir storybook && cd $_

yarn init -y

PACKAGE_UPDATES=$(cat <<-END
  // Load the package.json 
  let pkg=require("./package.json");

  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;
  
  !Boolean(pkg['scripts']) ? pkg['scripts'] = {} : null;

  pkg['scripts']['start'] = "start-storybook";
  pkg['scripts']['storybook'] = "start-storybook -p 6006";
  pkg['scripts']['build-storybook'] = "build-storybook";

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
END
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES

yarn add react react-dom
yarn add -D @babel/core @storybook/addon-actions @storybook/addon-essentials @storybook/addon-links @storybook/react @types/react babel-loader eslint eslint-config-next typescript


mkdir ./.storybook

cat > ./.storybook/main.js <<-EOF
module.exports = {
  stories: [
    // Storybook Defaults
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
    // Load Stories from the other Packages
    "../../packages/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
};
EOF

cat > ./.storybook/preview.js <<-EOF
export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
EOF

cd ../

echo "
#
# EOF
# Storybook
###############################################################
"


echo "
###############################################################
# SOF
# Playroom
#
"

mkdir ./playroom && cd $_

yarn init -y

PACKAGE_UPDATES=$(cat <<-EOF
  // Load the package.json 
  let pkg=require("./package.json");

  // Reset the package version to "0.0.0"
  pkg.version="0.0.0";

  // Set the package to private (required for yarn workspaces)
  pkg.private=true;
  
  !Boolean(pkg['scripts']) ? pkg['scripts'] = {} : null;
  pkg['scripts']['start'] = 'node ./get-components.js playroom start';
  pkg['scripts']['build'] = 'playroom build';

  // write out the modified JSON
  require("fs").writeFileSync("package.json", JSON.stringify(pkg, null, 2));
EOF
)

# Run the JS to modify the Package.json
node -e $PACKAGE_UPDATES

cat > playroom.config.js <<-EOF
module.exports = {
  components: './src/components',
  outputPath: './dist/playroom',

  // Optional:
  // title: 'My Awesome Library',
  // themes: './src/themes',
  // snippets: './playroom/snippets.js',
  // frameComponent: './playroom/FrameComponent.js',
  // scope: './playroom/useScope.js',
  // widths: [320, 768, 1024],
  // port: 9000,
  // openBrowser: true,
  // paramType: 'search', // default is 'hash'
  // exampleCode: '
  //  <Button>
  //    Hello World!
  //  </Button>
  // ',
  // baseUrl: '/playroom/',
  // webpackConfig: () => ({
  //  // Custom webpack config goes here...
  // }),
  iframeSandbox: 'allow-scripts',
};
EOF

cat > ./components.ts <<-EOF
/**
 * Components.ts
 * Components will be added to this file automatically when generated
 *
 */


EOF

cd ../

echo "
#
# EOF
# Playroom
###############################################################
"
