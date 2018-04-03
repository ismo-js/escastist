import {ArgumentParser, ArgumentGroup} from "argparse"

// ~~~

export function parse(
    argv :string[],
) {
    const prog = "pois"
    const addHelp = true
    const topParser = new ArgumentParser({
        prog,
        addHelp,
        description:
            "Generates unicode point property representing binary blobs",
        epilog:
            "ısmo. — ∷escasᴛısᴛ",
    })
    const subparser = topParser.addSubparsers({dest: "subcommandPredicate"})

    for (let curPred of predicates) {
        let [
            key, sym, description,
            argize, 
        ] :PredicateSpec = curPred

        const curPredParser = subparser.addParser(key, {
            addHelp,
            description,
        })

        argize(curPredParser)
    }

    const flags = topParser.parseArgs(argv)

    return flags
}

const dirPathHelp =
    "Path to the plane directory"
const maskerHelp =
    "identifiers of core maskers"

// + Argumentize parser with default flags:
function argizeBluepr(
    parser :ArgumentParser,
) :void {
    parser.addArgument(["-V", "--verbose"], {
        action: "count",
        defaultValue: 0,
    })
    parser.addArgument(["-O", "--outDirPath"], {help: dirPathHelp})
    parser.addArgument(["-m", "--masker"], {
        help: maskerHelp,
        action: "append",
        defaultValue: [],
    })
}

// + Sideeffectful argumentization functions:
export type Argizer = (parser :ArgumentParser) => void
export type PredicateSpec = [string, symbol, string, Argizer]

// + Subcommand predicates:
export const predicates :PredicateSpec[] = [
    // +
    [
        "gen-some",
        Symbol("predicate GEN-SOME"),
        "Write **specific** plane files containing blobs to directory",
        ps => {
            argizeBluepr(ps)
            ps.addArgument(["-p", "--planes"], {help:
                "String containing hexadecimals\
                representing the unicode planes\
                to generate blobs from"
            })
        },
    ],
    // +
    [
        "gen-all",
        Symbol("predicate GEN-ALL"),
        "Write **all** plane files containing blobs to directory",
        argizeBluepr,
    ],
]