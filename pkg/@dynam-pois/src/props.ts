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