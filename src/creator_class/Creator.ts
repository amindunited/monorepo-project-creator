


class Creator {

  constructor () {}

  public async bash (cmd: string, ...cmdArgs: string[]) { }
  public async install (cmd: string, ...cmdArgs: string[]) { }

  /**
   * Directory
   */
  public async goTo (directoryPath: string) {

  }

  public async createDirectory (directoryPath: string) {

  }

  /**
   * Files
   */

  public async createFile( fileName: string, fileContent: string | Promise<string> ) {

  }

  public async copyFile( sourceFile: string, destinationFile: string ) {

  }



}
