import * as hash from "object-hash"

import {Int} from "@escastist/lowbar-prim"

// ~~~


export type CacheMap = {[key :string] :any}

export function cache<
      Fun extends Function>(
    chMap :CacheMap,
    fun? :any,
) {
    function applyCh(
        tgt :Fun,
        self :Object,
        args :any[],
    ) :any {
        // Hash based on thisness and arguments:
        const signatHash = hash({self, args})

        if (signatHash in chMap)
            return chMap[signatHash]
        
        const res = tgt.apply(self, args)

        chMap[signatHash] = res
        return res
    }

    function cacheFun<Pxied extends Fun>(
        pxied :Pxied,
    ) :Pxied {
        return new Proxy(
            pxied,
            {apply: applyCh},
        )
    }

    function cacheMeth<Tgt extends Object>() {
        type Desc = TypedPropertyDescriptor<Tgt>

        ;return (tgt :Tgt, prop :keyof Tgt, {
            enumerable, configurable,
        } :Desc) => {
            Reflect.defineProperty(tgt, prop, {
                enumerable, configurable,
                get() {
                    if ("function" === typeof tgt[prop])
                        return cacheFun(tgt[prop] as any as Fun)

                    throw new TypeError(
                        "Function expected for method caching",
                    )
                }
            })
        }
    }

    if ("function" === typeof fun)
        return cacheFun(fun)

    return cacheMeth()
}
