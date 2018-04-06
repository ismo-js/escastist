export type AuType<E> = AuElem<>

export abstract class AuElem<
      E extends HTMLElement = HTMLElement>
      extends HTMLElement {
    protected readonly src :string
    readonly local :string

    constructor () :this & E {
        super()
    }

    get is() {
        const a = document.createElement("a")
        a.href = this.src
        return `${a.hash}-${this.local}`
    }
})

export class AuIntro extends AuElem {
    protected readonly src = (document.currentScript as HTMLScriptElement).src
    readonly local = "intro"

    constructor() {
        super()

        this.appendChild(document.createTextNode("Hey!"))
    }
}