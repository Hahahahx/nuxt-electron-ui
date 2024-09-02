#!/bin/bash

sh ./install.sh
nuxt generate
pnpm transpile-electron
node build.js
