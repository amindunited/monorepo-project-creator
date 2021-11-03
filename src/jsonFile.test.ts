import { jsonFile } from "./utils/json-file";

(async () => {

  console.log('loaded jsonFile.ts', jsonFile);
  const pkg = await jsonFile('./mooks.json');
  await pkg.save(pkg.content);

})();
