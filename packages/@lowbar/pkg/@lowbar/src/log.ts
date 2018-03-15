const signs = [
    "\n=-=-= ",
    "`*´   ",
    "`$´   ",
    "`!´   ",
    "`!!!´ ",
]

export function log(lvl :0 | 1 | 3 | 5 | 7) {
    const sign = signs[Math.ceil(lvl / 2)]

    return (
        tmp :TemplateStringsArray,
        ...vals :any[]
    )=> {
        const valStrs = vals.map((e)=> {switch (typeof e) {
            case "boolean":
                const bool = e as boolean
                return `[boolean: ${bool.toString().toUpperCase()}]`
            case "number":
                const num = e as number
                return `[number: ${num.toString(16)}]<<${num}>>`
            case "string":
                const str = e as string
                return `[string: ${
                    [...str].slice(0, 3).map((char)=>
                        char.codePointAt(0)!.toString(16)
                    ).join(":")
                } …]<<${str.replace("\n", ">> NL <<")}>>`
            default:
                const o = e as Object
                const proto = Object.getPrototypeOf(o)
                return `[${
                    proto[Symbol.toStringTag]
                }]<<${e.toString()}>>`
        }})
        const pairs = tmp.map((e, i)=> i < vals.length
            ? [e, valStrs[i]]
            : [e]
        ) as ([string] | [string, string])[]
        const output = sign
              + pairs.map((pair)=> pair.join("")).join("")

        console.error(output)
    }
}