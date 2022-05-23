const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');

const srcAssets = path.join(__dirname, 'assets');
const distAssets = path.join(projectDist, 'assets');

const srcStyles = path.join(__dirname, 'styles');
const distStyles = path.join(projectDist, 'style.css');

const components = path.join(__dirname, 'components');
const srcHtml = path.join(__dirname, 'template.html');
const distHtml = path.join(projectDist, 'index.html');

async function deepFolderCopy(src, dist) {
  try {
    await fs.promises.rm(dist, {
      recursive: true,
      force: true,
    });
    await fs.promises.mkdir(dist, {
      recursive: true,
    });

    const items = await fs.promises.readdir(src, {
      withFileTypes: true,
    });

    for (const item of items) {
      const newSrc = path.join(src, item.name);
      const newDist = path.join(dist, item.name);

      if (item.isDirectory()) {
        await fs.promises.mkdir(newDist, { recursive: true });
        await deepFolderCopy(newSrc, newDist);
      } else if (item.isFile()) {
        await fs.promises.copyFile(newSrc, newDist);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function mergeCss(src, dist) {
  try {
    const resStyles = [];
    const files = await fs.promises.readdir(src, {
      withFileTypes: true,
    });

    for (const file of files) {
      const isFile = file.isFile();
      const fileExt = path.extname(file.name).split('.')[1];

      if (isFile && fileExt === 'css') {
        const current = path.resolve(src, file.name);
        const content = await fs.promises.readFile(current, {
          encoding: 'utf-8',
        });
        resStyles.push(content);
      }
    }
    await fs.promises.writeFile(dist, resStyles);
  } catch (err) {
    console.error(err);
  }
}

async function mergeHtml(src, dist, components) {
  try {
    let template = await fs.promises.readFile(src, { encoding: 'utf-8' });
    const chunks = await fs.promises.readdir(components, {
      withFileTypes: true,
    });

    for (const chunk of chunks) {
      const currentName = chunk.name.split('.')[0];
      const currentPath = path.resolve(components, chunk.name);
      const content = await fs.promises.readFile(currentPath, {
        encoding: 'utf-8',
      });
      template = template.replace(`{{${currentName}}}`, content);
    }

    await fs.promises.writeFile(dist, template);
  } catch (err) {
    console.error(err);
  }
}

async function build() {
  deepFolderCopy(srcAssets, distAssets);
  mergeCss(srcStyles, distStyles);
  mergeHtml(srcHtml, distHtml, components);
}

build();
