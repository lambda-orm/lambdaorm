#!/usr/bin/env bash
# get data
SOURCE_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')

# Only execute release from develop branch
if [ $SOURCE_BRANCH != 'develop' ]; then
    # push to current branch
    git add .
    git commit -m "to develop"
    git pull    
    git push
    # merge develop branch
    git checkout develop
    git pull    
    git merge ${SOURCE_BRANCH}
    git push
    # update source branch
    git checkout ${SOURCE_BRANCH}
    git merge develop
    git push   
else
    echo "Error: Can only be run from a different branch than develop."
    exit -1
fi;