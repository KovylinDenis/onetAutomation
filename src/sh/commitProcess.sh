#!/bin/bash

if [ -z $(git status --short) ]
then 
  echo "Nothing to commit after processing"; 
  exit 0; 
else 
  git config --global user.name "github-actions[bot]";
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
  echo "Config stage passed"; 
  git pull origin; 
  echo "Pulled"; 
  #git stash; 
  #git checkout --track origin/"$GITHUB_SHA-branch"; 
  #git stash pop; 
  git add -A; 
  echo "staged"; 
  git commit -m "Processed accounts Part $DATABASE_PART"; 
  echo "commited"; 
  git push origin "$GITHUB_SHA-branch";
fi