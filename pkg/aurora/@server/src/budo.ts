#!/usr/bin/env node

import * as budo from "budo"
import tsify from "tsify"

const dir = "./var"

budo("./src/index.ts", {
    portfind: false,
    verbose: true,
    watchGlob: dir + "/**",
    dir,
    browserify: {
        transform: tsify,
    },
})