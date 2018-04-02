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

import {Entry, Poi} from "./props"

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

export async function generate(
    planes :Plane[],
) {
    const contentType = "application/xml"
    const ucdDom = await JSDOM.fromFile(
        "../var/ucd.nounihan.grouped.xml",
        {contentType}
    )
    const ucdAttrs = extract(ucdDom)
}

export function extract(
    dom :JSDOM,
) {
    const ucdDoc = dom.window.document

    // Char tag nodes:
    const charTags = [...ucdDoc.getElementsByTagName("char")]
    const attrEntries = charTags.map((charTag :Element) :Entry[] =>
        Poi.attrNames.map((attr :string) => {
            let val
            let tag = charTag
            do {
                val = charTag.getAttribute(attr)
            } while (null === val
                  && (tag = tag.parentElement!))

            return [attr, val || ""] as Entry
        })
    )
}