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
                subscr.unsubscribe()
            },
            error: err => {
                rjc(err)
                subscr.unsubscribe()
            },
            complete: () => {
                rjc()
            },
        })
    })
}