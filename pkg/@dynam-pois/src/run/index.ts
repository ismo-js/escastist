#!/usr/bin/env node

import {Int} from "@beyond-life/lowbar"

import gen from "./predicates/gen"

// ~~~

function main() {
    const {argv} = process
    const getPredicate = () => {switch (argv[2] || "") {
        case "gen-some":
            return gen.some
        case "gen-all":
        case "":
            return gen.all
        default:
            throw new class extends Error {
                readonly exitCode = 127
                constructor () {
                    super(`main: Inexistent predicate requested!`)
                }
            }
    }}

    try {
        getPredicate()(argv.slice(3))
    } catch (e) {
        console.trace(e)
        process.exit(
            (e as {exitCode? :Int}).exitCode || 126,
        )
    }
}


main()