document.addEventListener("DOMContentLoaded", ev => {
    const main = document.getElementsByTagName("main")[0]
    const greeter = document.createElement("b")
    const greeting = document.createTextNode("Hey, guys!")

    greeter.appendChild(greeting)
    main.insertBefore(greeter, main.firstElementChild)
})