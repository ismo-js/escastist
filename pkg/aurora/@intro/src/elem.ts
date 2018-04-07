import {proto} from "@escastist/lowbar-complex"

export abstract class AuMixIn {
    protected readonly src :string
    readonly local :string

    get is() {
        const a = document.createElement("a")
        a.href = this.src
        return `${a.hash}-${this.local}`
    }
}

const auMixer = <E extends HTMLElement>(
    elemCtor :new (..._ :any[])=> E = HTMLElement as new ()=> E,
) :new () => AuMixIn & E => {
    type AuTy = {
        [P in keyof E & AuMixIn] :E[P]
    }

    class AuMixed {
        readonly prototype = proto(AuMixIn.prototype, elemCtor)

        constructor () {
            elemCtor.constructor()
            AuMixIn.constructor()
        }
    }

    return AuMixed as any as new () => AuMixIn & E
    //… Anyhack!
}

export default auMixer