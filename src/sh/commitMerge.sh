#!/bin/bash

if [ -z "$(git status --short)" ]
then 
  echo "Nothing to commit after merging files"; 
  exit 0; 
else 
  git config --global user.name "github-actions[bot]"; 
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
  git pull origin; 
  git stash; 
  git checkout --track origin/"$GITHUB_SHA-branch"; 
  git stash pop; 
  git add -A; 
  git commit -m "Cleanup"; 
  git push origin "$GITHUB_SHA-branch"; 
  git checkout master; 
  git merge "$GITHUB_SHA-branch"; 
  git push origin master 
fi