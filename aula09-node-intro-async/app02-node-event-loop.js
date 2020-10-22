'use strict'

console.log('Program start')

function submit(label, timeout) {
    setTimeout(() => {
        console.log('Dispatched ' + label)
        submit('FIM', 1000)
    }, timeout)
}

submit('ola', 1000)
console.log('task submitted!')