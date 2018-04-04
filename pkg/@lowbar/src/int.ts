export const INT :unique symbol = Symbol("[integer pseudo-type]")
export type Int = number & typeof INT

export function isInt(a :any) :a is Int {
    return "number" === typeof a && Number.isSafeInteger(a)
}