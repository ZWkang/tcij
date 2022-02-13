#!/usr/bin/env zx

let {version} = require('./package.json')

echo "Building docs..."

git stash save

git checkout gh-pages

git pull origin gh-pages

git merge main --squash --no-edit

rm -rf dist

if (awiat $`ls -l | grep -v "node_modules"`) {
  echo "downloading node_modules..."
  await $`yarn`;
}

npm run docs:build

git add dist

await $`git commit -m "docs: build ${version}"`

git push origin gh-pages

echo `build docs done`

git checkout main

git stash pop
