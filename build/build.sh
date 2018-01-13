#!/bin/bash

set -e

TAG=$1

if [ -z "$TAG" ]; then
  echo "Tag not specified - eg 0.1.0"
  echo
  echo "Usage:"
  echo "./build.sh <tag>"
  echo
  echo "Example:"
  echo "./build.sh 0.1.0"
  exit
fi

cd ../

npm run build:prod

cd build/

rm -rf tmp/

mkdir -p tmp/www/browser

cp -R ../dist/* tmp/www
cp -R ../browser/* tmp/www/browser

docker build -t bpjackhopner/toastwallet-website:${TAG} .
