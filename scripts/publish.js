const { Command } = require('commander');
const { exec } = require('child-process-promise');
const { getVersion } = require('./helpers/get-version');
const { setVersion } = require('./helpers/set-version');
const { preparePackage } = require('./helpers/prepare-package');

const DIST_FOLDER_NAME = 'dist';
const VALID_TAGS = ['lts', 'rc', 'beta'];

async function main() {
  const cli = new Command();

  cli.requiredOption(
    '-t, --tag <tag>',
    `Publish package to NPM with one of the following tags: ${VALID_TAGS.join(
      ', '
    )}`
  );

  cli.parse(process.argv);

  const { tag } = cli.opts();

  if (!VALID_TAGS.includes(tag)) {
    console.log(`Given tag is invalid. Valid types: ${VALID_TAGS.join(', ')}`);

    process.exit();
  }

  if (tag === 'lts') {
    // TODO: check already published versions
    console.log(
      'Publishing of lts version is not implemented yet. Please do it manually.' +
        'Do the following step by step:' +
        '1. Validate version in package.json' +
        '2. Run npm run build' +
        '3. Run npm run publish:prepare' +
        '4. Go to dist folder and run npm run publish'
    );

    process.exit();
  }

  const currentVersion = getVersion();
  setVersion(`${currentVersion}-${tag}-${Date.now()}`);
  await exec('npm run build');
  preparePackage();
  await exec('npm', ['run', 'publish', DIST_FOLDER_NAME, '--tag', tag]);
}

main();
