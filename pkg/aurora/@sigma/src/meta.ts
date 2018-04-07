import {Stream as $} from "xstream"
import {adapt} from "@cycle/run/lib/adapt"

// @@@

import {Int} from "@escastist/lowbar-prim"

// ~~~

export interface Resrc {
    resourceUri :string
    uuid :string
}

export interface Server {
    context :boolean
    cpu :Int
}

export function sigma(out$) {
    const rest :{
        name :string
        owner :Resrc
    } & Resrc = {} as any

    const in$ :$<typeof rest> = {} as any

    return adapt(in$)
}