import {Int} from "./int"

// ~~~

export type Prop = string | symbol

export function proto<
      P extends Object>(
    keys :Object,
    construct :new (..._ :any[])=> P,
) {
    const p = {...keys} as P
    Reflect.setPrototypeOf(p, construct.prototype)

    return p
}

export function getArrIndex<A>(
    arr :A[],
    needle :A,
) :Int | null {
    return arr.includes(needle)
        ? arr.indexOf(needle) as Int
        : null
}
