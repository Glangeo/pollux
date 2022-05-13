const { Command } = require('commander');
const { preparePackage } = require('../helpers');

/**
 * Prepares package to publish: copies NPM files from root directory to dist folder
 */
function prepareAction() {
  preparePackage();
}

/**
 * Prepares package to publish
 */
const prepareCmd = new Command('prepare')
  .description('Prepares package in dist folder.')
  .action(prepareAction);

module.exports = { prepareAction, prepareCmd };
