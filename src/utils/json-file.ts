import { loadFile, saveFile } from ".";

const jsonFile = async (filePath: string) => {
  const content = await loadFile(filePath)
    .then(content => JSON.parse(content))
    .catch(() => ({}));
  const save = (content: JSON) => saveFile(filePath, JSON.stringify(content, null, 2));
  return {
    content,
    save,
  }
};

export {
  jsonFile
}
