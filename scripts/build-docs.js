#!/usr/bin/env zx

let { version } = require('./package.json');

await $`echo "Building docs..."`;

await $`git stash save`;

await $`git checkout gh-pages`;

await $`git pull origin gh-pages`;

await $`git merge main --squash --no-edit`;

await $`rm -rf dist`;

if (await $`ls -l | grep -v "node_modules"`) {
  await $`echo "downloading node_modules..."`;
  await $`yarn`;
}

await $`npm run docs:build`;

await $`git add -f dist`;

await $`git commit -m "docs: build ${version}"`;

await $`git push origin gh-pages`;

await $`echo "build docs done"`;

await $`git checkout main`;

await $`git stash pop`;
