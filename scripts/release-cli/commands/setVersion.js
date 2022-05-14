const path = require('path');
const { Command } = require('commander');
const { DIST_FOLDER_NAME, PUBLISHING_TAGS } = require('../constants');
const { writeVersion, readVersion, getVersionByTag } = require('../helpers');
const { TagOption } = require('../options');

/**
 * Sets version of the package to publish.
 * Only changes version in `dist/package.json` file! When publishing `latest` version, change version in root `package.json` manually
 *
 * @param {'latest'|'rc'|'beta'} tag npm dist tag
 */
function setVersionAction(tag) {
  if (!PUBLISHING_TAGS.includes(tag)) {
    console.log('Given tag is invalid. Aborting.');

    process.exit();
  }

  const rootPackageVersion = readVersion();
  const newVersion = getVersionByTag(rootPackageVersion, tag);

  writeVersion(newVersion, path.join(process.cwd(), DIST_FOLDER_NAME));
}

/**
 * CLI set-version command
 */
const setVersionCmd = new Command('set-version')
  .description('Calculates version by given tag')
  .requiredOption(TagOption.option, TagOption.description)
  .action(({ tag }) => setVersionAction(tag));

module.exports = { setVersionAction, setVersionCmd };
