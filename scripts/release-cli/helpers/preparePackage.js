const fs = require('fs');
const path = require('path');

const INCLUDE = ['package.json', 'LICENSE.md'];

/**
 * Moves copies of the exporting files to dist folder
 */
function preparePackage() {
  const configPath = path.join(process.cwd(), 'tsconfig.json');
  const distFolderPath = require(configPath).compilerOptions.outDir;

  for (const fileName of INCLUDE) {
    const sourceFilePath = path.join(process.cwd(), fileName);
    const targetFilePath = path.join(distFolderPath, fileName);

    if (fs.existsSync(targetFilePath)) {
      fs.unlinkSync(targetFilePath);
    }

    fs.copyFileSync(sourceFilePath, targetFilePath);
  }
}

module.exports = { preparePackage };
