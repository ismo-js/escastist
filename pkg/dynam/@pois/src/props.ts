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

export type Entry = [string, string]

export class Poi {
    static readonly attrNames = [
        // * General:
        "cp", // code point
        "gc", // category
        // * Num:
        "Hex", // hex digit
        // * Pattern:
        "IDS", // ID start
        "IDC", // ID continue
        "Pat_Syn", // syntax
    ]

    readonly poiI :Int

    readonly ucdInfo :{
        gc :string
        hex :string
        ids :string
        idc :string
        pat_syn :string
    }

    constructor (es :Entry[]) {
        const info = {}
        let poiI = null
        for (let e in es) {
            const [k, value] = e

            if ("cp" === k)
                poiI = parseInt(value, 16) as Int

            Reflect.defineProperty(info, k.toLowerCase(), {value})
        }

        this.ucdInfo = info as Poi["ucdInfo"]
        this.poiI = poiI!
    }

    get kindI() {
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