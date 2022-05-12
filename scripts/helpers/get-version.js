const fs = require('fs');
const path = require('path');

/**
 * Get package version in package.json
 *
 * @param {string} [packageFolderPath] - absolute folder path where package.json file is located
 */
function getVersion(packageFolderPath) {
  const filePath = path.join(
    packageFolderPath || process.cwd(),
    'package.json'
  );
  const contents = JSON.parse(fs.readFileSync(filePath).toString());

  return contents.version;
}

module.exports = { getVersion };
