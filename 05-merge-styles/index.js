const fs = require('fs');
const path = require('path');

(async () => {
  const srcDirPath = path.resolve(__dirname, 'styles');
  const distFilePath = path.resolve(__dirname, 'project-dist', 'bundle.css');
  const resStyles = [];
  const files = await fs.promises.readdir(srcDirPath, {
    withFileTypes: true,
  });

  for (const file of files) {
    const isFile = file.isFile();
    const fileExt = path.extname(file.name).split('.')[1];

    if (isFile && fileExt === 'css') {
      const current = path.resolve(srcDirPath, file.name);
      const content = await fs.promises.readFile(current, {
        encoding: 'utf-8',
      });
      resStyles.push(content);
    }
  }

  await fs.promises.writeFile(distFilePath, resStyles);
})();
