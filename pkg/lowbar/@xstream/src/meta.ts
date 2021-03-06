import {
    Producer, Listener,
    Stream as $,
} from "xstream"

// ~~~

export class IterProducer<Elem> implements Producer<Elem> {
    running = false

    constructor (readonly elems :Iterable<Elem>) {}

    start(lis :Listener<Elem>) {
        this.running = true

        for (let node of this.elems) setImmediate(()=> {
            const next = ()=> lis.next(node)
            
            if (this.running) next()
        })
        lis.complete()
    }

    stop() {
        this.running = false
    }
}

// ---

export function promisify$<Elem>(
    elem$ :$<Elem>,
) :Promise<Elem> {
    return new Promise((rsv, rjc) => {
        const subscr = elem$.subscribe({
            next: elem => {
                rsv(elem)
                console.log("##PROM-RESOLVED")
                subscr.unsubscribe()
            },
            error: err => {
                rjc(err)
                console.log("##PROM-REJECTION !!")
                subscr.unsubscribe()
            },
            complete: () => {
                rjc()
            },
        })
    })
}