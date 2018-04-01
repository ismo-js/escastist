import * as fs from "fs-extra"

import {JSDOM} from "jsdom"

import {
    Stream as $,
    MemoryStream as Mem$,
} from "xstream"
import fromEv from "xstream/extra/fromEvent"

// @@@

import {
    Int, isInt,
} from "@beyond-life/lowbar"

// ~~~

export enum Plane {
    basicMultilingual = 0x0,
    supplMultilingual = 0x1,
    supplIdeographic = 0x2,
    // […]
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

export async function generate(
    planes :Plane[],
) {
    const contentType = "application/xml"
    const ucdSrcBuffer = await fs.readFile("../var/ucd.nounihan.grouped.xml")
    const ucdDom = new JSDOM(ucdSrcBuffer, {contentType})
    const ucdDoc = ucdDom.window.document
    const charTags = ucdDoc.getElementsByTagName("char")
}