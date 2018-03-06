export function proto<
      P extends Object>(
    keys :Object,
    construct :new (..._ :any[])=> P,
) {
    const p = {...keys} as P
    Reflect.setPrototypeOf(p, construct.prototype)

    return p
}

export const INT :unique symbol = Symbol("[integer]")
export type Int = number & typeof INT