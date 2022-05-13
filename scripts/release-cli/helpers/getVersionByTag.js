const { LTS_TAG, RC_TAG, BETA_TAG } = require('../constants');

/**
 * Calculates build version by the given release tag
 *
 * @param {string} currentVersion current package version
 * @param {'latest'|'rc'|'beta'} tag tag that is used to calculate build version
 */
function getVersionByTag(currentVersion, tag) {
  switch (tag) {
    case LTS_TAG:
      return currentVersion;

    case RC_TAG:
      return `${currentVersion}-rc-${Date.now()}`;

    case BETA_TAG:
      return `${currentVersion}-beta-${Date.now()}`;

    default:
      console.log('Given tag is invalid. Aborting.');
      process.exit();
  }
}

module.exports = { getVersionByTag };
