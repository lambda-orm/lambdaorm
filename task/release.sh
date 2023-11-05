#!/usr/bin/env bash
SOURCE_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
# Only execute release from develop branch
if [ $SOURCE_BRANCH == 'develop' ]; then
    # tag and push to develop
    standard-version
    VERSION=$(jq -r '.version' ./package.json )
    git add .
    git commit -m "ci(release): release ${VERSION} 
    
    #0"
    git push --follow-tags origin develop
    # create branch release
    git checkout -b release/${VERSION}
    git push --set-upstream origin release/${VERSION}
    git checkout main
    git merge release/${VERSION} -m "chore(release): release ${VERSION}"
    git push origin main
    git checkout develop
    git merge release/${VERSION} -m "chore(release): release ${VERSION}"
    git push --set-upstream origin release/${VERSION}
else
    echo "Error: The release must be executed from the develop branch and not from the ${SOURCE_BRANCH} branch."
    exit -1
fi;
