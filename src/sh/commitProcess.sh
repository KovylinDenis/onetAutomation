#!/bin/bash

if [ -z $(git status --short) ]
then 
  echo "Nothing to commit after processing"; 
  exit 0; 
else 
  sudo chown -R "${USER:-$(id -un)}" .
  git config --global user.name "github-actions[bot]";
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
  git pull origin; 
  git add -A; 
  git commit -m "Processed accounts Part $DATABASE_PART"; 
  git push origin "$GITHUB_SHA-branch";
fi