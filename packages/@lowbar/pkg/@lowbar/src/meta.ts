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
        ;raw+=step as number
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