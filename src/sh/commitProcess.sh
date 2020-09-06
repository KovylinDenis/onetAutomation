#!/bin/bash
status="$(git status --short)"
diff="$(git diff master origin/master)"
sum=$status$diff    
echo "status: '$status'"
echo "diff: '$diff'"
echo "sum: '$sum'"
sudo chown -R "${USER:-$(id -un)}" .
git config --global user.name "github-actions[bot]";
git config --global user.email "41898282+github-actions[bot]@users.noreply.github.com"; 
git config --global pull.rebase true
git config --global rebase.autoStash true
git add -A; 
git commit -m "Processed accounts Part $DATABASE_PART"; 
git pull origin "$GITHUB_SHA-branch"; 
git push --force origin "$GITHUB_SHA-branch";