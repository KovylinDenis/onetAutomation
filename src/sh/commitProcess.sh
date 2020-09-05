#!/bin/bash
status="$(git status --short)"
diff="$(git diff master origin/master)"
sum=$status$diff
if [ -z "$sum" ]
then 
  echo "Nothing to commit or push after processing"; 
  exit 0; 
else       
  echo "status: '$status'"
  echo "diff: '$diff'"
  echo "sum: '$sum'"
  echo "Commit $i retry"
  sudo chown -R "${USER:-$(id -un)}" .
  git config --global user.name "github-actions[bot]";
  git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
  git config --global pull.rebase true
  git config --global rebase.autoStash true
  git add -A; 
  git commit -m "Processed accounts Part $DATABASE_PART"; 
  git pull --rebase origin "$GITHUB_SHA-branch"; 
  git push --force origin "$GITHUB_SHA-branch";
  sleep 3
fi