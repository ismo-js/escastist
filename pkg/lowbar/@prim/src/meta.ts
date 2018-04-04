export const INT :unique symbol = Symbol("[integer pseudo-type]")
export type Int = number & typeof INT

export function isInt(a :any) :a is Int {
    return "number" === typeof a && Number.isSafeInteger(a)
}

// ---

export function isStr(a :any) :a is string {
    return "string" === typeof a
}
export function areStr(a :any) :a is string[] {
    return Array.isArray(a) && a.every((e :any) =>
        "string" === typeof e
    )
}

export const fromPoi = String.fromCodePoint