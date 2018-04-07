import auMixer from "./elem"

export class AuIntro extends auMixer() {
    protected readonly src = (document.currentScript as HTMLScriptElement).src
    readonly local = "intro"

    constructor() {
        super()

        this.appendChild(document.createTextNode("Hey!"))
    }
}