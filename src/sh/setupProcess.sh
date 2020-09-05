#!/bin/bash

git config --global user.name "github-actions[bot]";
git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
git pull origin;
git checkout --track origin/"$GITHUB_SHA-branch";
npm run processAccounts