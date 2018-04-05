import {fork} from "child_process"
import {join} from "path"

// @@@

import {Plane} from "../../plane"
import {generate} from "../../meta"

// ~~~

namespace gen {
    export async function some({planes, outDirPath, verbose} :any) {
        console.log(`*> outDirPath: <<${outDirPath}>>`)

        const planeIs = [
            ...(planes as string).trim(),
        ].map((pl) => {
            const planeI = parseInt(pl, 16)

            if (!(planeI in Plane)) throw new Error(`
                Incorrect plane index varg "${pl}"
                in "${pl}".
            `)
            
            return planeI as Plane
        })

        await generate({
            planes: planeIs,

            cons: !verbose ? void 0 : console,
            outDirPath,
        })
    }

    const forkPlanes = [
        "1e",
        //… means: **this** process looks up for plane `0x1` and `0xe`
        "0", "2",
    ]
    const runPath = join(__dirname, "../index.js")

    export async function all({masker, outDirPath, verbose} :any) {
        for (let forkPlaneStr of forkPlanes.slice(1))
            fork(runPath, [
                "gen-some",
                "-p" + forkPlaneStr,
                ...(masker as string[]).map(m => "-m" + m),
                ...Array(Number(verbose)) // Array with length = verbose
                    .fill("-V"),
                "-O" + outDirPath,
            ])
        await some({
            planes: forkPlanes[0],
            masker, verbose, outDirPath,
        })
    }
}
export default gen