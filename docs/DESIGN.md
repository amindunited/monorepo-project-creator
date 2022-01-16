#

## Language

```
goto(Directory)
  createDirectory()
  and() // And Passes the previous value into the next??
  goTo()
  createFile()
  and()
  append('text')
```

### // CMD

- bash

### // File

- createFile

- copyFile

- fromTemplate

- append

- prepend

### // Directory

- goTo

- createDirectory

## Jasmine Style:

```
describe('Install package-name', () => {

  install('npm', 'install', 'package-name', '--save-dev')
    .goTo('./dir')
    .createFile('./package.rc', from('https://source'))
    .addToJson('./package.json', 'package.scripts', { value: '' })
  .removeFromJson('./package.json', 'package.scripts', { del_value: '' });

});
```

## Objects

```
  import { goTo } from 'Directory';

  const dir = goTo(`dirPath`).createDir(``); // returns result
  const config = goTo(dir).createFile(`.filerc`, `content`);
  const json = modifyJson('./package.json', 'scripts', {'start': 'node ./startScript.js'})


```

## Summary
