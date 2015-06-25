#!/bin/sh

rm -rf dist || exit 0;
mkdir dist;
( cd dist
 git init
 git config user.name "sarbbottam"
 git config user.email "sarbbottam@gmail.com"
 cp ../example/modal.html ./index.html
 cp ../example/style.css ./style.css
 cp ../example/script.js ./script.js
 git add .
 git commit -m "initial commit"
 git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
)
