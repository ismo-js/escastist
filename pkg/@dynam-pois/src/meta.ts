import {join} from "path"
const joinHere = join.bind(null, __dirname)

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

import {Int, isInt} from "@beyond-life/lowbar"

import {
    props,
    Masker, MaskerFun, Masks, Mask,
    Entry, Poi,
} from "./props"
import {
    Plane,
    PLANE_LEN, PLANE_MASK,
} from "./plane"

// ~~~

export {
    Int,
    props, Masker, MaskerFun, Masks, Mask,
    Plane,
}

export async function generate(
    planes :Plane[],
    outDirPath :string,
    masker :Masker,
) {
    const plStr = planes.map((e)=> e.toString(16)).join(":")
    console.group("#gen-" + plStr)
    console.time("#dom")

    const contentType = "application/xml"
    const dom = await Dom.fromFile(
        joinHere("../var/ucd.nounihan.grouped.xml"),
        {contentType}
    )

    console.timeEnd("#dom")
    console.log(`=> #gen-${plStr}-stm:
        DOM generated… — streaming`)
    console.time("#stm")

    const charTags = dom.window.document.getElementsByTagName("char")
    const charTag$ = $.create(new DomNodeProdc<Element>(charTags))

    console.timeEnd("#stm")
    console.log(`=> #gen-${plStr}-xtc:
        Nodes streamed … — extracting:`)
    console.time("#xtc")
    
    const planeBins = planes.map(pl =>
        [pl, extract(charTag$, pl)] as [Plane, Uint8Array]
    )

    console.timeEnd("#xtc")
    console.log(`=> #gen-${plStr}-wrt:
        Plane blobs generated… — writing`)
    console.time("#wrt")
    
    const wrPromises = planeBins.map(([pl, bin]) => {
        const filePath = join(
            outDirPath,
            `${pl.toString(16)}--${Plane[pl]}.blob`,
        )
        
        return fs.writeFile(
            filePath,
            bin,
        )
    })

    await Promise.all(wrPromises)

    console.timeEnd("#wrt")
    console.log(`=> #gen-${plStr}-end:
        Files written…`)
}

// ---

// + Producer iterating over DOM's `NodeList`s:
export class DomNodeProdc<NodeT extends Node> implements Producer<NodeT> {
    running = false

    constructor (readonly nodes :NodeList) {}

    start(lis :Listener<NodeT>) {
        this.running = true

        for (let node of this.nodes) setImmediate(()=> {
            const next = ()=> lis.next(node as NodeT)
            
            if (this.running) next()
        })
    }

    stop() {
        this.running = false
    }
}

// + Extracts info from a char element stream → binary form:
export function extract(
    tag$ :$<Element>,
    plane :Plane,
) :Uint8Array {
    console.group("#xtc")

    const onlyPlaneTag$ = tag$.filter((charTag :Element) => {
        const poiI = parseInt(charTag.getAttribute("cp")!, 16)
        const planeI = poiI >> 0x10
        const onPlane = plane as number === planeI

        return onPlane
    })
    const attrEntries$ = onlyPlaneTag$.map((charTag :Element) :Entry[] =>
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

    console.log(`=> Inspecting ${Plane[plane]} plane…`)

    const pois = attrEntries$.map((entries :Entry[]) :Poi => 
        new Poi(entries)
    )

    console.log(`=> Allocating ${Plane[plane]} plane array…`)

    const bin = new Uint8Array(PLANE_LEN)

    console.log(`=> Binarizing ${Plane[plane]} plane…`)

    pois.map(poi =>
        bin.set(
            [poi.propsI],
            poi.poiI & PLANE_MASK
        )
    )

    console.log(`=> ${Plane[plane]} plane binarized…`)
    console.groupEnd()

    return bin
}