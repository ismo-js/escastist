import {Stream as $} from "xstream"
import {adapt} from "@cycle/run/lib/adapt"

// @@@

import {Int} from "@escastist/lowbar-prim"

// ~~~

export abstract class Resrc {
    uri :string // original "resource_uri"
    uuid :string
}

export abstract class Drive {

}

export abstract class Cpu {
    clocking :Int // original "cpu"
    model :"kvm64" = "kvm64" // original "cpu_model"
    type :"amd" | "intel"
          | "sparc_t4" | "sparc_t5" // original "cpu_type"
          = "amd"
    seperateCores :boolean // original "cpus_instead_of_cores"
          = false
}

export abstract class Hypervisor {
    type :"kvm" | "solaris-kz" = "kvm" // original "hypervisor"
    relaxed :boolean = false // original "hv_relaxed"
    timeStampC :boolean = false // original "hv_tsc"
}

export abstract class Server {
    context :boolean = true
    cpu :Cpu
    hv :Hypervisor
    drives :Drive[] = []
    // left out: `grantees`
    jobs :Job[]

}

export function sigma(out$) {
    const rest :{
        name :string
        owner :Resrc
    } & Resrc = {} as any

    const in$ :$<typeof rest> = {} as any

    return adapt(in$)
}