export namespace props {
    export enum Termin {
        not = 0x0,
        horizontal = 0x1,
        vertical = 0x2,
        unital = 0x3,
    }

    export enum Ident {
        not = 0x0,
        start = 0x1,
        continue = 0x2,
    }

    export enum Punctua {
        not = 0x0,
        inter = 0x1,
        open = 0x2,
        close = 0x3,
    }
}

export enum Shift {
    termin = 0,
    ident = 4,
    punctua = 8,
}