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
    oper        = 0x4,
    brac        = 0x6,
}

export type Entry = [string, string]

export class Poi {
    static readonly attrNames = [
        // * General:
        "gc", // category
        // * Num:
        "Hex", // hex digit
        // * Pattern:
        "IDS", // ID start
        "IDC", // ID continue
        "Pat_Syn", // syntax
    ]

    readonly ucdInfo :{
        gc :string
        hex :string
        ids :string
        idc :string
        pat_syn :string
    }

    constructor (es :Entry[]) {
        const info = {}
        for (let e in es) {
            const [k, value] = e

            Reflect.defineProperty(info, k.toLowerCase(), {value})
        }

        this.ucdInfo = info as Poi["ucdInfo"]
    }
}