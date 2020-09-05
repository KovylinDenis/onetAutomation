#!/bin/bash
status="$(git status --short)"
diff="$(git diff master origin/master)"
sum=$status+$diff
if [ -z "$sum" ]
then 
  echo "Nothing to commit after processing"; 
  exit 0; 
else       
  echo $status
  echo $diff
  echo "Commit $i retry"
fi