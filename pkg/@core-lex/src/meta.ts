import {
    Stream as $,
    MemoryStream as Mem$,
} from "xstream"
import flattenSeq from "xstream/extra/flattenSequentially"

// @@@

import {
    Int, isInt,
} from "@beyond-life/lowbar"

// ~~~

export default function lex(
    chunk$ :$<string>,
) {
    const poi$$ = chunk$.map((e :string) :$<Int> => {
        const ePois = [...e].map((poi :string) :Int =>
            poi.codePointAt(0) as Int
        )
        const ePoi$ = $.from(ePois)

        return ePoi$
    })
    const poi$ = poi$$.compose(flattenSeq)
}