class IsmoIntro extends HTMLElement {
    constructor () {
        super()

        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(document.getElementById("intro").content)
        const h = document.createElement("h1")
        h.appendChild(document.createTextNode("Eyy!"))
        this.shadowRoot.appendChild(h)
    }
}

window.customElements.define("ismo-intro", IsmoIntro)