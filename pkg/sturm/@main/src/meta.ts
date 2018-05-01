export class Stream {

}

export namespace Stream {
    export const SHIFT :unique symbol =
        Symbol("> shift stream")
    export const APPLY :unique symbol =
        Symbol("> apply abstract stream")
}

// @@@

function $<E extends Object>(
    iterable :Iterable<E>,
) :Stream<E>

//  Synchronous Stream:
function $<E extends Object>(
    iterable :AsyncIterable<E>,
) :Stream<E & Countable>

//  Abstracted Stream:
function $<Fun extends Function>(
    fun :Fun,
) :Stream<Fun>

export default $