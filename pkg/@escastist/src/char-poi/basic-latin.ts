import {
    Int, isInt,
    sym,
    refKey,
} from "@beyond-life/lowbar"

// ~~~

const poiKinds = sym("Code point kind")
export const WHITE_SPACE :unique symbol =
    Symbol(poiKinds.WHITE_SPACE.toString())
export const LINE_TERM :unique symbol =
    Symbol(poiKinds.LINE_TERM.toString())

export type PoiKind = never
    | typeof WHITE_SPACE
    | typeof LINE_TERM

export interface PoiMetadata {
    kind :PoiKind
    name :string
}

export default class BasicLatin {
    @refKey() [0x09] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "FTab",
    }
    @refKey() [0x0b] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "VTab",
    }
    @refKey() [0x0c] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "FFeed",
    }
    @refKey() [0x20] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "Space",
    }
    @refKey() [0xa0] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "NoBrSpace",
    }

}