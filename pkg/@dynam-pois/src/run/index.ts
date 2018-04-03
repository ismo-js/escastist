#!/usr/bin/env node

import {Int} from "@beyond-life/lowbar"

import {parse, PREDICATE} from "./flags"
import gen from "./predicates/gen"

// ~~~

function main() {
    const flags = parse(process.argv.slice(2))
    const getPredicate = () => {switch (flags[PREDICATE]) {
        case "gen-all":
            return gen.all
        case "gen-some":
            return gen.some
        default:
            process.exit(127)
            return ()=> {} // Type hack; hack!
    }}

    try {
        getPredicate()(flags)
    } catch (e) {
        console.trace(e)
        process.exit(
            (e as {exitCode? :Int}).exitCode || 126,
        )
    }
}

main()