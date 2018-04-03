import {Int, Nullable} from "@beyond-life/lowbar"

import {Plane} from "./plane"

// ~~~

export namespace props {
    export enum Kind {
        nil         = 0x0,
        termHorizontal,
        termVertical,

        idStart     = 0x3,
        idContinue,

        bracOpen    = 0x5,
        bracClose,
    }

    export enum Digit {
        nil         = 0x0,
        decimal,
        hexadecimal,
    }
}

export enum Shift {
    kind        = 0x0,
    digit       = 0x4,
}

// ---

export type Masker = MaskerFun | Map<keyof Plane, Masks>

// Function for masking unicode properties before blobbing & writing
export type MaskerFun = (poi :Poi) => Mask

export type Masks = Nullable<Mask>[] | {[key :number] :Mask}

export interface Mask {
    digit? :props.Digit
    kind? :props.Kind 
}

// ---

export type AttrEntry = [string, string]

class Poi {
    readonly poiI :Int

    readonly info :{[I in Poi.InfoNames] :string}

    constructor (entries :AttrEntry[]) {
        const info = {}
        let poiI = null

        for (let e in entries) {
            const [k, value] = e

            if ("cp" === k)
                poiI = parseInt(value, 16) as Int

            Reflect.defineProperty(info, k.toLowerCase(), {value})
        }

        this.info = info as Poi["info"]
        this.poiI = poiI!
    }

    get kindI() {
        Poi.verticalTerms.includes(this.info.lb)
        return 0x0
    }

    get digitI() {
        return 0x0
    }

    get propsI() {
        return 0
            | this.kindI << Shift.kind
            | this.digitI << Shift.digit
    }
}

namespace Poi {
    export const verticalTerms = ["BK", "CR", "LF", "NL"]

    export const attrNames = [
        // + General:
        "cp", // code point
        "gc", // category
        // + Presentation:
        "lb",
        // + Num:
        "Hex", // hex digit
        // + Pattern:
        "IDS", // ID start
        "IDC", // ID continue
        "Pat_Syn", // syntax
        "Pat_WS", // white space
    ]

    export type InfoNames = never
        | "gc"
        | "lb"
        | "hex"
        | "ids" | "idc"
        | "pat_syn" | "pat_ws"
    }

    export const enum infoNames {
        gc,
        lb,
        hex,
        ids, idc,
        pat_syn, pat_ws,
    }
}

export {Poi}