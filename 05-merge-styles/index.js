const fs = require('node:fs/promises');
const path = require('path');
const { appendFile, truncate, createReadStream } = require('fs');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

const merge = async () => {
  truncate(bundlePath, () => {})
  const files = await fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true});
  for(let i = 0; i < files.length; i++) {
    const stat = await fs.stat(path.join(__dirname, 'styles', files[i].name));
    const readStream = createReadStream(path.join(__dirname, 'styles', files[i].name), 'utf-8');
    readStream.on('data', (chunk) => stat.isFile() && (path.extname(files[i].name) === '.css') && appendFile(bundlePath, `${chunk}\n`, () => {}));
  }
}

merge();
