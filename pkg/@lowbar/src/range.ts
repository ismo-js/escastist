import {Int} from "./int"

// ~~~

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