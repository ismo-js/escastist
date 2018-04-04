import {Int} from "@escastist/lowbar-prim"

// ~~~

export enum Plane {
    basicMultilingual = 0x0,
    supplMultilingual = 0x1,
    supplIdeographic = 0x2,
    // […] — empty planes
    supplSpecial = 0xe,
}

export namespace Plane {
    export const planes = [
        Plane.basicMultilingual,
        Plane.supplMultilingual,
        Plane.supplIdeographic,
        Plane.supplSpecial,
    ]
}

// ---

export const PLANE_LEN = 0xFFFE as Int
export const PLANE_MASK :number = 0xFFFF
