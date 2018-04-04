import {Int, INT, isInt} from "@escastist/lowbar-prim"

// ~~~

export * from "./range"

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

// ---

export function refKey(
    type :typeof INT | null = null,
    key :Prop = INT === type
        ? "index"
        : "key",
) {
    return (
        tgt :Object,
        prop :Prop,
        desc :PropertyDescriptor,
    ) => {
        const {value} = desc
        const valueNext = {
            ...value,
            [key]: prop,
        }
        const proto = Reflect.getPrototypeOf(value)

        Reflect.setPrototypeOf(valueNext, proto)
        return {
            ...desc,
            value: valueNext,
        }
    }
}

// ---

export type Nullable<In> = {
    [Prop in keyof In] :In[Prop] | null
}