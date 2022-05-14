const path = require('path');
const { Command } = require('commander');
const { prompt } = require('inquirer');
const { exec } = require('child-process-promise');
const { readVersion } = require('../helpers');
const { PUBLISHING_TAGS, DIST_FOLDER_NAME } = require('../constants');
const { TagOption } = require('../options');
const { setVersionAction } = require('./setVersion');
const { prepareAction } = require('./prepare');

/**
 * Publish package to NPM
 *
 * @param {'latest'|'rc'|'beta'} tag NPM dist tag
 */
async function publishAction(tag) {
  if (!PUBLISHING_TAGS.includes(tag)) {
    console.log(
      `Given tag is invalid. Valid tags: ${PUBLISHING_TAGS.join(', ')}`
    );

    process.exit();
  }

  const distFolderPath = path.join(process.cwd(), DIST_FOLDER_NAME);

  prepareAction();
  setVersionAction(tag);

  const version = readVersion(distFolderPath);

  await exec(`git add ${path.join(distFolderPath, '*')}`);
  await exec(`git commit -m "npm release verion ${version}"`);

  // TODO: when input is not valid, send question again
  const { otp } = await prompt([
    {
      name: 'otp',
      type: 'string',
      message: 'Provide OTP:',
      validate: (input) => {
        if (input.length !== 6) {
          return 'OTP must contain 6 digits.';
        }

        return true;
      },
    },
  ]);

  const publish = await exec(`npm publish --tag=${tag} --otp=${otp}`, {
    cwd: distFolderPath,
  });

  console.log(publish.stdout);
}

/**
 * CLI publish command
 */
const publishCmd = new Command('publish')
  .description('Publish package to npm')
  .requiredOption(TagOption.option, TagOption.description)
  .action(({ tag }) => publishAction(tag));

module.exports = { publishAction, publishCmd };
