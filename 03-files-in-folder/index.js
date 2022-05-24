const fs = require('fs');
const path = require('path');

async function getFilesInfo(folder) {
  try {
    const files = await fs.promises.readdir(path.resolve(__dirname, folder), {
      withFileTypes: true,
    });
    for (const file of files) {
      if (!file.isDirectory()) {
        const fullName = file.name;
        const filePath = path.join(__dirname, folder, fullName);
        const fileName = fullName.split('.')[0];
        const fileExt = path.extname(fullName).split('.')[1];
        const fileSize = await fs.promises.stat(filePath).then((f) => f.size);

        console.log(`${fileName} - ${fileExt} - ${fileSize} bytes`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

getFilesInfo('secret-folder');
