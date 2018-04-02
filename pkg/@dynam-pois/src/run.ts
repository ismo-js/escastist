import {fork} from "child_process"

// @@@

import {
    Plane,
    generate,
} from "./meta"

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
    const [...planeStrs] = process.argv[3].split(":")

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

    generate(planes)
}

function genAll(details :string[]) {
    if (details.length) throw new Error(`
        gen-all:
        Superfluous vargs.
    `)

    const args = ["0:e", "1:2"]

    for (let arg of args.slice(1))
        fork(__filename, ["gen-planes", arg])
    genPlanes
}

main()