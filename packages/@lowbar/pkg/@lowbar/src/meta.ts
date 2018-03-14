export function proto<
      P extends Object>(
    keys :Object,
    construct :new (..._ :any[])=> P,
) {
    const p = {...keys} as P
    Reflect.setPrototypeOf(p, construct.prototype)

    return p
}

// ---

export const INT :unique symbol = Symbol("[integer pseudo-type]")
export type Int = number & typeof INT
export function isInt(a :any) :a is Int {
    return "number" === typeof a && Number.isSafeInteger(a)
}

// ---

export type Prop = string | symbol
export function isStr(a :any) :a is string {
    return "string" === typeof a
}
export function areStr(a :any) :a is string[] {
    return Array.isArray(a) && a.every((e :any) =>
        "string" === typeof e
    )
}

// ---

export type Rangable = Int | string
export function *range<
      Origin extends Rangable>(
    origin :Origin,
) {
    const rawMap :{
        [key :string] :<Clothed extends Rangable>(clothed :Clothed) => Int
    } = {
        number: (clo) => Math.floor(clo as Int) as Int,
        string: (clo) => (clo as string).codePointAt(0) as Int,
    }
    const clothMap :{
        [key :string] :(raw :Int) => Rangable
    } = {
        number: (raw) => raw,
        string: (raw) => String.fromCodePoint(raw),
    }

    const ty = typeof origin
    const rawOri = rawMap[ty](origin)

    let raw: number = rawOri, step :Int; 
    for (
        ;
        ;raw += "number" === typeof step
            ? step as number
            : 1
    ) step = yield clothMap[ty](raw as Int)
}
export function *till<T>(
    it :Iterable<T>,
    fin :T,
) {
    for (let e of it) if (fin === e)
        return fin
    else yield e
}

// ---

const signs = [
    "=-=-= ",
    "`*´   ",
    "`$´   ",
    "`!´   ",
    "`!!!´ ",
]
export function log(lvl :0o0 | 0o1 | 0o3 | 0o5 | 0o7) {
    const sign = signs[Math.ceil(lvl / 2)]

    return (tmp :TemplateStringsArray, ...vals :any[])=> {
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
                    [...str].slice(0, 3).map((char)=> char.codePointAt(0)!.toString(16)).join(":")
                } …]<<${str.replace("\n", ">> NL <<")}>>`
            default:
                return `[${
                    e[Symbol.toStringTag]
                }]<<${e.toString()}>>`
        }})
        const pairs = tmp.map((e, i)=> i < vals.length
            ? [e, valStrs[i]]
            : [e]
        ) as ([string] | [string, string])[]
        const output = "\n"
            + sign
            + pairs.map((pair)=> pair.join("")).join("")

        console.error(output)
    }
}