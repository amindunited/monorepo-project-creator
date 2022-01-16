import { loadFile, saveFile } from ".";

const copyFile = async (src: string, dest: string) => {
  const contents = await loadFile(src);
  await saveFile(dest, contents);
};

export {
  copyFile
}
