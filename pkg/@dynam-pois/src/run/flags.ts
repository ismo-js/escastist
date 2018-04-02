import {ArgumentParser, ArgumentGroup} from "argparse"

// ~~~

export default function parse() {
    const addHelp = true
    const parser = new ArgumentParser({
        addHelp,
        description:
            "Generates unicode point property representing binary blobs",
        epilog:
            "ısmo. — ∷escasᴛısᴛ",
    })
    const genSub = parser.addSubparsers({title: "Blob Generation"})

    for (let curPd of predicates) {
        let [key, group] = curPd

        const curPdParser = genSub.addParser(key, {addHelp})
    }
}

// ---

const dirPathHelp =
    "Path to the plane directory"
const maskerListHelp =
    "`:`-delimeted list containing identifiers of core maskers"

export const predicates :[string, (parser :ArgumentParser) => void][] = [
    ["gen-some", parser => {
        parser.addArgument(["-O", "--outDirPath"], {help: dirPathHelp})
        parser.addArgument(["-p", "--planes"], {help:
            "String containing hexadecimals\
            representing the unicode planes\
            to generate blobs from"
        })
        parser.addArgument(["-m", "--maskerList"], {help: maskerListHelp})
    }],
    ["gen-all", parser => {
        parser.addArgument(["-O", "--outDirPath"], {help: dirPathHelp})
        parser.addArgument(["-m", "--maskerList"], {help: maskerListHelp})
    }],
]