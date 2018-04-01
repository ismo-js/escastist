import {fork} from "child_process"

// @@@

import {
    Plane,
    generate,
} from "./meta"

// ~~~

function main() {
    const {argv} = process
    const [...planeStrs] = argv[2].split(":")

    if (planeStrs.length) {
        const planes = planeStrs.map((planeStr) => {
            const planeI = parseInt(planeStr, 16)

            if (!(planeI in Plane)) throw new Error(
                `Incorrect plane index varg "${planeStr}" in "${planeStrs}"`
            )
            
            return planeI as Plane
        })

        generate(planes)
    } else {
        const args = [["0:e"], ["1:2"]]

        for (let arg of args)
            fork(__filename, arg)
    }
}

main()