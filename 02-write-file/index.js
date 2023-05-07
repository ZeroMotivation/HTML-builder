const readLine = require('node:readline/promises');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});
const writeStream = fs.createWriteStream(filePath);
process.stdout.write('Hello! Enter your text here:\n');

rl.on('line', (line) => {
  if(line === 'exit') {
    rl.close();
    return;
  }
  else
    writeStream.write(`${line}\n`);
})
rl.on('SIGINT', () => rl.close());
rl.on('close', () => process.stdout.write('Goodbye!'));