import {Int} from "@escastist/lowbar-prim"

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
) :Stream<E> {
    return new StmPxy()
}

//  Synchronous Stream:
function $<E extends Object>(
    iterable :AsyncIterable<E>,
) :Stream<E & Countable>

//  Abstracted Stream:
function $<Fun extends Function>(
    fun :Fun,
) :Stream<Fun>

export default $

// @@@

class StmHandler implements ProxyHandler {
    constructor() {
        return new Proxy(new Stream(), this)
    }

    apply(tgt :Stream, self :Object, args :any[]) {
        tgt[APPLY]
    }
}