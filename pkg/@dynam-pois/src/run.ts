#!/usr/bin/env node

import {fork} from "child_process"

// @@@

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
            throw new Error(`
                Inexistent predicate requested.
            `)
    }}

    getPredicate()(argv.slice(3))
}

function genPlanes(details :string[]) {
    console.log("=> Startin: " + details.join(" @ "))

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

    generate(planes, details[1] || ".")
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