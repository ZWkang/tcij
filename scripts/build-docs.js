#!/usr/bin/env zx

let { version } = require('../package.json');

void (async function () {
  await $`echo "Building docs..."`;

  await $`git stash save`;

  await $`git checkout gh-pages`;

  await $`git pull origin gh-pages`;

  await $`git merge main --squash --no-edit`;

  await $`rm -rf docs`;

  if (await $`ls -l | grep -v "node_modules"`) {
    await $`echo "downloading node_modules..."`;
    await $`yarn`;
  }

  await $`npm run docs:build`;

  await $`git add docs`;

  let str = await $`git status`;

  if (/clean/.test(str)) {
    await $`echo "No changes to commit. return back branch"`;
  } else {
    await $`git commit -m "docs: build ${version}"`;
    await $`git push origin gh-pages -f`;
    await $`echo "build docs done"`;
  }

  await $`git checkout main`;

  await $`git stash pop`;
})();
