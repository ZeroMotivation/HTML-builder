const fs = require('node:fs/promises');
const path = require('path');
const { access } = require('fs');

const dirName = 'files';
const newDirPath = path.join(__dirname, `${dirName}_copy`);

const copyDir = async () => {
  access(newDirPath, async (err) => {
    if(err) {
      fs.mkdir(newDirPath, {recursive: true});
    }
    else {
      const files = await fs.readdir(newDirPath, () => {});
      files.forEach(async (file) => {
        fs.unlink(path.join(newDirPath, file));
      })
    }
    const files = await fs.readdir(path.join(__dirname, dirName), {withFileTypes: true});
    files.forEach(async (file) => {
      const fileName = `${file.name.split('.')[0]}${path.extname(file.name)}`;
      await fs.copyFile(path.join(__dirname, dirName, file.name), `${newDirPath}/${fileName}`);
    })
  })
}

copyDir();