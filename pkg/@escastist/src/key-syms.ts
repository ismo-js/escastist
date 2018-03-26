import {
    sym,
} from "@beyond-life/lowbar"

export namespace a {
    const {
        BREAK,
        CASE,
        CATCH,
        CONTINUE,
        CONST,
        DEBUGGER,
        DEFAULT,
        DELETE,
        DO,
        ELSE,
        LET,
        TRY,
        VAR,
    } = sym("<a>", "key tag")

    // ---

    export const decl = {
        CONST, DELETE, LET, VAR,
    }
    export const except = {
        CATCH, TRY,
    }
    export const flow = {
        BREAK, CASE, CONTINUE, DEFAULT, DO, ELSE,
    }
    export const meta = {
        DEBUGGER,
    }
}

export namespace o {
    const {
        EXPORT,
    } = sym("<o>", "key tag")

    // ---

    export const mod = {
        EXPORT,
    }
}

export namespace u {
    const {
        CLASS, EXTENDS,        
    } = sym("<u>", "key tag")

    // ---

    export const cls = {
        CLASS, EXTENDS,
    }
}