#!/usr/bin/env node

import {fork} from "child_process"

// @@@

import {Int} from "@beyond-life/lowbar"

import {Plane} from "./plane"
import {generate} from "./meta"

// ~~~

function main() {
    const {argv} = process
    const getPredicate = () => {switch (argv[2] || "") {
        case "gen-planes":
            return genPlanes
        case "gen-all":
        case "":
            return genAll
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

function genPlanes(details :string[]) {
    const [...planeStrs] = details[0]
    const planes = planeStrs.length
        ? planeStrs.map((planeStr) => {
            const planeI = parseInt(planeStr, 16)

            if (!(planeI in Plane)) throw new Error(`
                gen-planes:
                Incorrect plane index varg "${planeStr}"
                in "${planeStrs}".
            `)
            
            return planeI as Plane
        })
        : Plane.planes
    const outDirPath = details[1] || "."

    generate({planes, outDirPath, cons: console})
}

function genAll(details :string[]) {
    if (1 < details.length) throw new Error(`
        gen-all:
        Superfluous vargs.
    `)

    const forkArgs = [
        "1e",
        //… means: **this** process looks up for plane `0x1` and `0xe`
        "0", "2",
    ]
    const out = details[0]

    for (let arg of forkArgs.slice(1))
        fork(__filename, ["gen-planes", arg, out])
    genPlanes([forkArgs[0], out])
}

main()