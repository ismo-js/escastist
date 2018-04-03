import {fork} from "child_process"
const forkThis = fork.bind(null, __filename)

// @@@

import {Plane} from "../../plane"
import {generate} from "../../meta"

// ~~~

namespace gen {
    export function some({planes, outDirPath, verbose} :any) {
        const planeIs = [...planes as string].map((pl) => {
            const planeI = parseInt(pl, 16)

            if (!(planeI in Plane)) throw new Error(`
                gen-planes:
                Incorrect plane index varg "${pl}"
                in "${pl}".
            `)
            
            return planeI as Plane
        })

        generate({
            planes: planeIs,

            cons: !verbose ? void 0 : console,
            outDirPath,
        })
    }

    export function all({masker, outDirPath, verbose} :any) {
        const forkPlanes = [
            "1e",
            //… means: **this** process looks up for plane `0x1` and `0xe`
            "0", "2",
        ]

        for (let forkPlaneStr of forkPlanes.slice(1))
            forkThis([
                "gen-some",
                "-p" + forkPlaneStr,
                ...(masker as string[]).map(m => "-m" + m),
                ...Array(Number(verbose)) // Array with length = verbose
                    .map(() => "-V"),
                "-O" + outDirPath,
            ])
        some({
            planes: forkPlanes[0],
            masker, verbose, outDirPath,
        })
    }
}
export default gen