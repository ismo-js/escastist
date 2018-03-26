import {sym} from "@beyond-life/lowbar"

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

export interface PoiMetaset {
    [key :number] :PoiMetadata
}

export default class BasicLatin
      implements PoiMetaset {
    ;[0x09] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "Tab",
    }
    ;[0x0b] :PoiMetadata = {
        kind: WHITE_SPACE,
        name: "VTab",
    }

}