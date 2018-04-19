import * as hash from "object-hash"

import {Int} from "@escastist/lowbar-prim"

// ~~~


export type CacheMap = {[key :string] :any}

export function cache(
    chMap :CacheMap,
    fun? :any,
) {
    if ("function" === typeof fun)
        return cacheFun(chMap, fun)
}

function applyCh<
      Fun extends Function>(
    chMap :CacheMap,
    fun :Fun,
    self :Object,
    args :any[],
) :any {
    // Hash based on thisness and arguments:
    const signatHash = hash({self, args})

    if (signatHash in chMap)
        return chMap[signatHash]
    
    const res = fun.apply(self, args)

    chMap[signatHash] = res
    return res
}

function cacheFun<
      Fun extends Function>(
    chMap :CacheMap,
    fun :Fun,
) {
    return new Proxy(
        fun,
        {
            apply(
                fun :Fun,
                self :Object,
                args :any[],
            ) {
                return applyCh(chMap, fun, self, args)
            }
        },
    )
}

function cacheMeth() {
    type Desc = TypedPropertyDescriptor<Tgt>

    return (tgt :Tgt, prop :keyof Tgt, {
        enumerable, configurable, value,
    } :Desc) => {
        Reflect.defineProperty(tgt, prop, {
            enumerable, configurable,
            get() {
                cacheFun(value)
            }
        })
    }
}