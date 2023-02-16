// Netlify does not support Github Packages (or other private package registries besides npm), options are:
//   - Commit .npmrc to repo - However, now we have a secret token inside our repo
//   - Environment variable in .npmrc - However, this requires all developer machines to have the same environment variable configured
//   - Get creative with the preinstall script... :)

const fs = require('fs');
const { spawnSync } = require('child_process');

const scope = 'leoncan122';
const authToken = process.env.NPM_TOKEN;
// fs.writeFileSync(
//   '.npmrc',
//   `//npm.pkg.github.com/:_authToken=${process.env.NPM_TOKEN}\n//npm.pkg.github.com/:_header:Authorization=token ${process.env.NPM_TOKEN}\n@${scope}:registry=https://npm.pkg.github.com\n`,
//  );
console.log("script test")
// Only run this script on Netlify, this is a default Netlify environment variable
if (process.env.NETLIFY === 'true') {
  // Check if this has already run (we spawn yarn again at the end)
  if (process.env.NETLIFY_NPMRC_DONE === 'true') {
    return;
  }

  // Check if .npmrc already exists, if it does then do nothing (otherwise we create an infinite yarn loop)
  if (fs.existsSync('.npmrc')) {
    console.warn('Skipping .npmrc write because it already exists');
    return;
  }

  console.log(`Creating .npmrc with auth tokens for @${scope}, provided by GITHUB_TOKEN environment variable...`);

  // Create .npmrc
  fs.writeFileSync(
    '.npmrc',
    `//npm.pkg.github.com/:_authToken=${authToken}\n//npm.pkg.github.com/:_header:Authorization=token ${authToken}\n@${scope}:registry=https://npm.pkg.github.com\n`,
  );

  // Is this necessary?
  fs.chmodSync('.npmrc', 0o600);

  // Run yarn again, because the yarn process which is executing
  // this script won't pick up the .npmrc file we just created.
  // The original yarn process will continue after this second yarn process finishes,
  // and when it does it will report "success Already up-to-date."
  console.log(`.npmrc created. Starting yarn install...`);
  spawnSync('node', { stdio: 'inherit', env: { ...process.env, NETLIFY_NPMRC_DONE: true } });
}