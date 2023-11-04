#!/usr/bin/env bash
# get data
SOURCE_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Only execute from a different branch than develop and main
if [ $SOURCE_BRANCH != 'develop' ]; then
    # push to current branch
    git add . &&
    git commit -m "to develop" &&
    git pull &&     
    git push &&
    # merge develop branch
    git checkout develop &&
    git merge ${SOURCE_BRANCH} &&
    git push &&
    # update source branch
    git checkout ${SOURCE_BRANCH} &&
    git merge develop &&
    git push &&
    exit 0   
else
    echo "Error: Can only be run from a different branch than develop."
    exit -1
fi;