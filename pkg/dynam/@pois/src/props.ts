import {Int} from "@escastist/lowbar-prim"
import {Nullable} from "@escastist/lowbar-complex"

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
            const [k, attrValue] = e

            if (!attrValue.trim)
                console.log(`<***> Trim not found on: ${attrValue} (${typeof attrValue})`)
            const value = attrValue.trim()

            if ("cp" === k)
                poiI = parseInt(value, 16) as Int

            Reflect.defineProperty(info, k.toLowerCase(), {value})
        }

        this.info = info as Poi["info"]
        this.poiI = poiI!
    }

    get kindI() :props.Kind {
        if (Poi.verticalTerms.includes(this.info.lb))
            return props.Kind.termVertical
        switch ("Y") {
            case this.info.pat_ws:
                return props.Kind.termHorizontal
            case this.info.ids:
                return props.Kind.idStart
            case this.info.idc:
                return props.Kind.idContinue
        }
        switch (this.info.bpt) {
            case "o":
                return props.Kind.bracOpen
            case "c":
                return props.Kind.bracClose
        }
        return props.Kind.nil
    }

    get digitI() {
        if ("De" === this.info.nt)
            return props.Digit.decimal
        if ("Y" === this.info.hex)
            return props.Digit.hexadecimal
        return props.Digit.nil
    }

    get propsI() {
        const i = 0
            | this.kindI << Shift.kind
            | this.digitI << Shift.digit

        console.log("I: " + i.toString(16))
        return i as Int
    }
}

namespace Poi {
    export const verticalTerms = ["BK", "CR", "LF", "NL"]

    export const attrNames = [
        // + General:
        "cp", // code point
        "gc", // category
        // + Num:
        "nt", // type
        "Hex", // hex digit
        // + Presentation:
        "lb",
        // + Directional:
        "bpt",
        // + Pattern:
        "IDS", // ID start
        "IDC", // ID continue
        "Pat_Syn", // syntax
        "Pat_WS", // white space
    ]

    export type InfoNames = never
        | "gc"
        | "hex" | "nt"
        | "lb"
        | "bpt"
        | "ids" | "idc"
        | "pat_syn" | "pat_ws"
}

export {Poi}