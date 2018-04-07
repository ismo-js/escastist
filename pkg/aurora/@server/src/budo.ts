#!/usr/bin/env node

import * as budo from "budo"
import * as tsify from "tsify"

budo("src/index.ts", {
    portfind: false,
    verbose: true,
    live: true,
    watchGlob: "**",
    dir: "var",
    serve: "src/run",
    browserify: {
        plugin: tsify,
    },
})