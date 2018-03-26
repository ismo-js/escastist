import {
    sym,
} from "@beyond-life/lowbar"

export namespace a {
    const aSyms = sym("<a> statem", "key tag")

    export namespace decl {
        export const CONST :unique symbol =
            Symbol(aSyms.CONST.toString())
        export const DELETE :unique symbol =
            Symbol(aSyms.DELETE.toString())
        export const LET :unique symbol =
            Symbol(aSyms.LET.toString())
        export const VAR :unique symbol =
            Symbol(aSyms.VAR.toString())
    }
    export namespace except {
        export const CATCH :unique symbol =
            Symbol(aSyms.CATCH.toString())
        export const TRY :unique symbol =
            Symbol(aSyms.TRY.toString())
    }
    export namespace flow {
        export const BREAK :unique symbol =
            Symbol(aSyms.BREAK.toString())
        export const CASE :unique symbol =
            Symbol(aSyms.CASE.toString())
        export const CONTINUE :unique symbol =
            Symbol(aSyms.CONTINUE.toString())
        export const DEFAULT :unique symbol =
            Symbol(aSyms.DEFAULT.toString())
        export const DO :unique symbol =
            Symbol(aSyms.DO.toString())
        export const ELSE :unique symbol =
            Symbol(aSyms.ELSE.toString())
    }
    export namespace meta {
        export const DEBUGGER :unique symbol =
            Symbol(aSyms.DEBUGGER.toString())
    }
}

export namespace o {
    const oSyms = sym("<o> typing", "key tag")

    export namespace mod {
        export const EXPORT :unique symbol =
            Symbol(oSyms.EXPORT.toString())
    }
}

export namespace u {
    const uSyms = sym("<u> struct", "key tag")

    export namespace cls {
        export const CLASS :unique symbol =
            Symbol(uSyms.CLASS.toString())
        export const EXTENDS :unique symbol =
            Symbol(uSyms.EXTENDS.toString())
    }
}