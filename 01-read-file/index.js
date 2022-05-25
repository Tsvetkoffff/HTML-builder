const path = require('path');
const fs = require('fs');

fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf8')
  .on('error', (e) => console.error(e))
  .on('data', (chunk) => {
    console.log(chunk);
  });
