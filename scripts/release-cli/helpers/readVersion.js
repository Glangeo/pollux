const fs = require('fs');
const path = require('path');

/**
 * Get package version in package.json
 *
 * @param {string} [packageFolderPath] - absolute folder path where package.json file is located, defaults to process.cwd()
 */
function readVersion(packageFolderPath = process.cwd()) {
  const filePath = path.join(packageFolderPath, 'package.json');
  const contents = JSON.parse(fs.readFileSync(filePath).toString());

  return contents.version;
}

module.exports = { readVersion };
