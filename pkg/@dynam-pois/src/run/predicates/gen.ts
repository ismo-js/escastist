import {fork} from "child_process"
const forkThis = fork.bind(null, __filename)

// @@@

import {Plane} from "../../plane"
import {generate} from "../../meta"

// ~~~

namespace gen {
    export function some(details :string[]) {
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

    export function all(details :string[]) {
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
            forkThis(["gen-some", arg, out])
        some([forkArgs[0], out])
    }
}
export default gen