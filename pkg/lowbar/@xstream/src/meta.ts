import {
    Producer, Listener,
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

