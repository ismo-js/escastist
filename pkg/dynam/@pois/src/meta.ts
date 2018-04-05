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

import {Int, isInt} from "@escastist/lowbar-prim"
import {promisify$, IterProducer} from "@escastist/lowbar-xstream"

import {
    props,
    Masker, MaskerFun, Masks, Mask,
    AttrEntry, Poi,
} from "./props"
import {
    Plane,
    PLANE_LEN, PLANE_MASK,
} from "./plane"

// ~~~

export {
    Int,
    Masker, MaskerFun, Masks, Mask,
    props, Poi,
    Plane,
}

// ---

export async function generate(
    {planes, outDirPath, masker, cons} :generate.Options,
) {
    const plStr = planes.map((e)=> e.toString(16)).join(":")
    if (cons) {
        cons.group("#gen-" + plStr)
        cons.time("#dom")
    }

    const contentType = "application/xml"
    const dom = await Dom.fromFile(
        joinHere("../var/ucd.nounihan.grouped.xml"),
        {contentType}
    )

    if (cons) {
        cons.timeEnd("#dom")
        cons.log(`=> #gen-${plStr}-stm:
            DOM generated… — streaming`)
        cons.time("#stm")
    }

    const charTags = dom.window.document.getElementsByTagName("char")
    const charTag$ = $.create(new IterProducer<Element>(charTags))

    if (cons) {
        cons.timeEnd("#stm")
        cons.log(`=> #gen-${plStr}-xtc:
            Nodes streamed … — extracting:`)
        cons.time("#xtc")
    }
    
    const planeBins = planes.map(pl =>
        [pl, extract(charTag$, pl, cons)] as [Plane, Promise<Uint8Array>]
    )

    if (cons) {
        cons.timeEnd("#xtc")
        cons.log(`=> #gen-${plStr}-wrt:
            Plane blobs generated… — writing`)
        cons.time("#wrt")
    }
    
    const wrPromises = planeBins.map(async ([pl, bin]) => {
        const filePath = join(
            outDirPath,
            `${pl.toString(16)}--${Plane[pl]}.blob`,
        )
        
        await fs.writeFile(
            filePath,
            await bin,
        )
        if (cons) cons.log("=== DOES THIS ${pl} x GET EXECUTED?")
    })

    await Promise.all(wrPromises)

    if (cons) {
        cons.timeEnd("#wrt")
        cons.log(`=> #gen-${plStr}-end:
            Blob files written…`)
    }
}

// ---

export namespace generate {
    export interface Options {
        planes :Plane[]
        outDirPath :string
        masker? :Masker
        cons? :Console
    }
}

// + Extracts info from a char element stream → binary form:
export async function extract(
    tag$ :$<Element>,
    plane :Plane,
    cons? :Console,
) :Promise<Uint8Array> {
    if (cons) cons.group("#xtc")

    const onlyPlaneTag$ = tag$.filter((charTag :Element) => {
        const poiI = parseInt(charTag.getAttribute("cp")!, 16)
        const planeI = poiI >> 0x10
        const onPlane = plane as number === planeI
        let x = true

        if (cons && (poiI & 0xF) !== 0x1) //HACK to perform better when testing!!!
            x = false

        return isInt(poiI) && onPlane && x
    })
    const attrEntries$ = onlyPlaneTag$.map((charTag :Element) :AttrEntry[] =>
        Poi.attrNames.map((attrName :string) :AttrEntry => {
            let val
            let tag = charTag
            do {
                val = tag.getAttribute(attrName)
            } while (null === val
                  && (tag = tag.parentElement!))

            if ("string" !== typeof val && cons)
                cons.log(`<***> Other value found ${val} (${typeof val})`)

            return [attrName, val || ""]
        })
    )

    const poi$ = attrEntries$
        .map((entries :AttrEntry[]) :Poi => new Poi(entries))

    const aBin = new Uint8Array(PLANE_LEN)

    if (cons) cons.log(`=> Binarizing ${Plane[plane]} plane better…`)

    const endBin = await promisify$(poi$
        .fold(
            (lBin, poi) => {
                const nBin = new Uint8Array(lBin)
                
                console.count("bin")

                console.log(`${(poi.poiI & PLANE_MASK).toString(16)} := ${poi.propsI}`)

                /*nBin.set(
                    [poi.propsI],
                    poi.poiI & PLANE_MASK
                )*/
                return /*n**/lBin
            },
            aBin
        )
        .last()
    )

    if (cons) {
        cons.log(`=> ${Plane[plane]} plane binarized…`)
        cons.groupEnd()
    }

    return endBin
}