'use strict'

let stop = false

setTimeout(() => stop = true, 1000)

function loop() {
    console.log('Ola Mundo!')
    if(stop) return
    else setTimeout(() => loop())
}

loop()
