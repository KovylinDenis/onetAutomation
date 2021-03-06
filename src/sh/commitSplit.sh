#!/bin/bash

if [ -z "$(git status --short)" ] 
then 
  echo "Nothing to commit after splitting files"; 
  exit 0; 
else 
  git config --global user.name "github-actions[bot]"; 
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
  git pull origin; 
  git stash; 
  git checkout -b "$GITHUB_SHA-branch"; 
  git stash pop; 
  git add -A; 
  git commit -m "Splited accounts"; 
  git push origin "$GITHUB_SHA-branch"; 
fi