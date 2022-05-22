const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  try {
    await fs.promises.rm(path.join(__dirname, dest), {
      recursive: true,
      force: true,
    });
    await fs.promises.mkdir(path.join(__dirname, dest), {
      recursive: true,
    });

    const files = await fs.promises.readdir(path.resolve(__dirname, src));

    for (const file of files) {
      const srcPath = path.join(__dirname, src, file);
      const destPath = path.join(__dirname, dest, file);
      await fs.promises.copyFile(srcPath, destPath);
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir('files', 'files-copy');
