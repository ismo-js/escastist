import {ArgumentParser, ArgumentGroup} from "argparse"

// ~~~

export default function parse(
    argv :string[],
) {
    const prog = "pois"
    const addHelp = true
    const parser = new ArgumentParser({
        prog,
        addHelp,
        description:
            "Generates unicode point property representing binary blobs",
        epilog:
            "ısmo. — ∷escasᴛısᴛ",
    })
    const genSub = parser.addSubparsers({title: "Blob Generation"})

    for (let curPd of predicates) {
        let [key, description, argize] = curPd

        const curPdParser = genSub.addParser(key, {
            addHelp,
            description,
        })

        argize(curPdParser)
    }

    const flags = parser.parseArgs(argv)

    return flags
}

// ---

const dirPathHelp =
    "Path to the plane directory"
const maskerListHelp =
    "`:`-delimeted list containing identifiers of core maskers"

export const predicates :[string, string, (parser :ArgumentParser) => void][] = [
    [
        "gen-some",
        "Write **specific** plane files containing blobs to directory",
        parser => {
            parser.addArgument(["-O", "--outDirPath"], {help: dirPathHelp})
            parser.addArgument(["-p", "--planes"], {help:
                "String containing hexadecimals\
                representing the unicode planes\
                to generate blobs from"
            })
            parser.addArgument(["-m", "--maskerList"], {help: maskerListHelp})
        }
    ],
    [
        "gen-all",
        "Write **all** plane files containing blobs to directory",
        parser => {
            parser.addArgument(["-O", "--outDirPath"], {help: dirPathHelp})
            parser.addArgument(["-m", "--maskerList"], {help: maskerListHelp})
        }
    ],
]