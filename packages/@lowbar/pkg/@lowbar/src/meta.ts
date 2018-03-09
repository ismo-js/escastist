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

export function isStr(a :any) :a is string {
    return "string" === typeof a && !!a.length
}
