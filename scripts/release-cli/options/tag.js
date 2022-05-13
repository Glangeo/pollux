const { PUBLISHING_TAGS } = require('../constants');

module.exports = {
  option: '-t, --tag <tag>',
  description: `NPM dist tag. Available tags: ${PUBLISHING_TAGS.join(', ')}.`,
};
