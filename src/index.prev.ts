import { version } from 'process';
import path from 'path';
import { promises } from 'fs';
import { spawn } from 'child_process';
import axios from 'axios';

import { bash, packageJSON } from './utils';
import { communityDocsSetup, gitSetup , yarnWorkspacesSetup } from './methods';

const { appendFile, readFile, writeFile } = promises;

const TOGGLES = {
  GIT: false,
  YARN: false,
  COMMUNITY: false,
  TYPESCRIPT: false,
};



/**
 * NOTES!!!
 * 
 * The FNs:
 * 
 * Load a Local file
 * Load a Remote file
 * 
 * (convert to ...)
 *    json
 * edit / modify
 * 
 * save (write)
 * 
 * append to file
 * 
 * run command
 * 
 * delete file
 * 
 */


const run = async () => {
  /**
   * SOF - Project Dir
   */
  console.log(`Project Directory ${process.cwd()}`);
  /**
   * EOF - Project Dir
   */

  /**
   * SOF - Git Setup
   */
  if (TOGGLES.GIT) {
    await gitSetup();
  } else {
    console.log(`Skipping Git Setup`);
  }
  /**
   * EOF - Git Setup
   */

  /**
   * SOF - Yarn Workspaces Setup
   */
   if (TOGGLES.YARN) {
   await yarnWorkspacesSetup();
  } else {
    console.log(`Skipping Yarn Workspaces Setup`);
  }
  /**
   * EOF - Yarn Workspaces Setup
   */

  /**
   * SOF - Community Docs
   */
    if (TOGGLES.COMMUNITY) {
    await communityDocsSetup();
    } else {
      console.log(`Skipping Community Docs Setup`);
    }
    /**
    * EOF - Community Docs
    */

};

run().then(() => {
  console.log('Finished');
});
