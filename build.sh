#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

nx reset

# Build ng-demos application
nx run ng-demos:build

# Build presenty-landing-site application
nx run presenty-landing-site:build -- --base-href=/about/

# Move presenty-landing-site build output to ng-demos/about
mkdir -p dist/apps/ng-demos/about
mv dist/apps/presenty-landing-site/* dist/apps/ng-demos/about/
