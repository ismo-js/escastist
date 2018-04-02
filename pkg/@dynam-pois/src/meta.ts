import {join} from "path"

import * as fs from "fs-extra"

import {JSDOM as Dom} from "jsdom"

import {
    Stream as $,
    MemoryStream as Mem$,
    Producer,
    Listener,
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

// ---

export async function generate(
    planes :Plane[],
    outPath :string,
) {
    const joinHere = join.bind(null, __dirname)
    const contentType = "application/xml"
    const ucdDom = await Dom.fromFile(
        joinHere("../var/ucd.nounihan.grouped.xml"),
        {contentType}
    )

    console.log("=> DOM generated…")

    const planeBins = planes.map(pl =>
        [pl, extract(ucdDom, pl)] as [Plane, Uint8Array]
    )

    console.log("=> Plane blobs generated…")
    
    const wrPromises = planeBins.map(([pl, bin]) => {
        const filePath = join(
            outPath,
            `${pl.toString(16)}--${Plane[pl]}.blob`
        )
        
        return fs.writeFile(
            filePath,
            bin,
        )
    })

    await Promise.all(wrPromises)
    console.log("=> Files written…")
}

// ---

const PLANE_LEN = 0xFFFE as Int
const PLANE_MASK :number = 0xFFFF

// ! Cache only works for one document
function getChar$(document :Document) {
    console.log(`===##> Getting nodes…`)
    console.time("#get")
    const nodes = document.getElementsByTagName("char")
    console.timeEnd("#get")
    console.log(`===##> Streaming nodes…`)
    console.time("#stm")
    const node$ = $.create(new class ElemProducer implements Producer<Element> {
        running = false

        start(lis :Listener<Element>) {
            const curSym = Symbol("# [Listener]")

            this.running = true
            for (let node of nodes) setImmediate(() =>
                this.running ? lis.next(node) : void 0
            )
        }

        stop() {
            this.running = false
        }
    })
    console.timeEnd("#stm")

    return node$
}

export function extract(
    dom :Dom,
    plane :Plane,
) :Uint8Array {
    console.log(`===> Accessing ${Plane[plane]} plane's DOM…`)
    const {document} = dom.window

    console.log(`===> Enumerating ${Plane[plane]} plane's chars…`)

    // Char tag nodes:
    const charTag$ :$<Element> = getChar$(document)
    console.log(`===> Filtering ${Plane[plane]} plane's chars…`)
    const planeCharTag$ = charTag$.filter((charTag :Element) => {
        const poiI = parseInt(charTag.getAttribute("cp")!, 16)
        const planeI = poiI >> 0x10
        const onPlane = plane as number === planeI

        return onPlane
    })
    console.log(`===> ${Plane[plane]} plane's chars filtered…`)
    const attrEntries$ = planeCharTag$.map((charTag :Element) :Entry[] =>
        Poi.attrNames.map(attr => {
            let val
            let tag = charTag
            do {
                val = charTag.getAttribute(attr)
            } while (null === val
                  && (tag = tag.parentElement!))

            return [attr, val || ""] as Entry
        })
    )
    const pois = attrEntries$.map((entries :Entry[]) :Poi => 
        new Poi(entries)
    )

    console.log(`===> Allocating ${Plane[plane]} plane array…`)

    const bin = new Uint8Array(PLANE_LEN)

    console.log(`===> Binarizing ${Plane[plane]} plane…`)

    pois.map(poi =>
        bin.set(
            [poi.propsI],
            poi.poiI & PLANE_MASK
        )
    )

    console.log(`===> ${Plane[plane]} plane binarized…`)
    return bin
}