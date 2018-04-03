import {isInt} from "./int"

// ~~~

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
        const valStrs = vals.map((val)=> {switch (typeof val) {
            case "boolean":
                const bool = val as boolean
                return `[boolean: ${bool.toString().toUpperCase()}]`
            case "number":
                const num = val as number
                return `[number: ${num.toString(16)}]<<${num}>>`
            case "string":
                const str = val as string
                return `[string: ${
                    [...str].slice(0, 3).map((char)=>
                        char.codePointAt(0)!.toString(16)
                    ).join(":")
                } …]<<${str.replace("\n", ">> NL <<")}>>`
            case "undefined":
                return `[undefined]`
            default:
                if (null === val) return "[null]"

                const o = val as Object
                return `${
                    Object.prototype.toString.call(o)
                }<<${Array.isArray(o) && o.every((e)=> isInt(e))
                    ? o.map((e)=> e.toString(16)).join(":")
                    : o.toString()
                }>>`
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