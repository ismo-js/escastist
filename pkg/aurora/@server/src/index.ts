function loaded(ev :Event | null) {
    console.log(`Loaded: ${ev}`)

    const main = document.getElementsByTagName("main")[0]
    const greeter = document.createElement("b")
    const greeting = document.createTextNode("Hey, guys!")

    greeter.appendChild(greeting)
    main.insertBefore(greeter, main.firstElementChild)
}

const loadedStates = ["complete", "loaded", "interactive"]

function main() {
    console.log("Inited")

    const {readyState, addEventListener} = document
    const loadedStAny = loadedStates as any
    //… Anyhack; Y does TS throw on Array.prototype.includes?

    if (loadedStAny.includes(readyState))
        loaded(null)
    else
        addEventListener("DOMContentLoaded", loaded, false)
    console.log("Listenin")
}

// ~~~

main()

// ~~~

import "./shady"
