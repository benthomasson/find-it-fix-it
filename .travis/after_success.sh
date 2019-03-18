#!/usr/bin/env bash

set -x
set -e

# Check if it is a pull request
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo -e "Pull Request, not pushing a build"
    exit 0;
else
    openssl aes-256-cbc -K $encrypted_2eeb7a4fa1ff_key -iv $encrypted_2eeb7a4fa1ff_iv -in deploy_key.enc -out deploy_key -d
    chmod 600 deploy_key
    eval `ssh-agent -s`
    ssh-add deploy_key
fi

# If current branch is master, push to ___
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    .travis/release.sh
fi

# If current branch has stable, push to ___
if [[ ${TRAVIS_BRANCH} =~ stable\/* ]]; then
    .travis/release_stable.sh
fi
