#!/usr/bin/env bash
SOURCE_BRANCH=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
VERSION=$(jq -r '.version' ./package.json )
APP=lib

# Only execute release from develop branch
if [ $SOURCE_BRANCH == 'develop' ]; then
    # tag and push to develop
    git tag "${VERSION}" -m "${VERSION}"
    git push
    # create branch release and publish from branch
    git flow release start "${VERSION}"
    git flow release finish "${VERSION}"   
else
    echo "Error: The release must be executed from the develop branch and not from the ${SOURCE_BRANCH} branch."
    exit -1
fi;
