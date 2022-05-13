/** Dist folder path. Actual folder for publishing */
const DIST_FOLDER_NAME = 'dist';

const LTS_TAG = 'latest';
const RC_TAG = 'rc';
const BETA_TAG = 'beta';

/** Available tags to publish */
const PUBLISHING_TAGS = [LTS_TAG, RC_TAG, BETA_TAG];

module.exports = {
  DIST_FOLDER_NAME,
  LTS_TAG,
  RC_TAG,
  BETA_TAG,
  PUBLISHING_TAGS,
};
