class IsmoIntro extends HTMLElement {
    constructor () {
        super()

        this.attachShadow({mode: "open"})
        this.shadowRoot.appendChild(document.getElementById("template-intro").content)
    }
}

window.customElements.define("ismo-intro", IsmoIntro)