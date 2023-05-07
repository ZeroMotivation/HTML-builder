const fs = require('fs/promises');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

const filesList = async () => {
  const files = await fs.readdir(dirPath, {withFileTypes: true});
  files.forEach(async (file) => {
    const stat = await fs.stat(path.join(dirPath, file.name));
    const splited = file.name.split('.');
    if(stat.isFile())
      console.log(`${splited[0]} - ${splited[1]} - ${stat.size}b`);
  });
}

filesList();