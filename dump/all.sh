#!/bin/bash -e

echo "Updating project files"
git pull
npm update

echo "Fetching data from Wikipedia"
# get everything and generate data.json
node wiki.js ids
node wiki.js rev
node wiki.js update
node wiki.js parse -p

# pull again to avoid conflicts, then commit the new data
echo "Publishing data"
git pull
git add ../site/src/json/data.json ../site/smiles.txt
git commit -m "update data"
git push
