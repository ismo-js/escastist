#!/usr/bin/env node

import {Int} from "@beyond-life/lowbar"

import parse from "./flags"
import gen from "./predicates/gen"

// ~~~

function main() {
    const flags = parse(process.argv.slice(2))
    
    console.dir(flags)
    
    try {
        void 0
    } catch (e) {
        console.trace(e)
        process.exit(
            (e as {exitCode? :Int}).exitCode || 126,
        )
    }
}


main()