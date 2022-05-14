const fs = require('fs');
const path = require('path');

/**
 * Set package version in package.json
 *
 * @param {string} version - package version
 * @param {string} [packageFolderPath] - absolute folder path where package.json file is located
 */
function writeVersion(version, packageFolderPath) {
  const filePath = path.join(
    packageFolderPath || process.cwd(),
    'package.json'
  );
  const contents = JSON.parse(fs.readFileSync(filePath).toString());

  contents.version = version;

  fs.writeFileSync(filePath, JSON.stringify(contents, null, 2));
}

module.exports = { writeVersion };
