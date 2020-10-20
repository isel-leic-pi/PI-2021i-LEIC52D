'use strict'

function Point(x, y) {
    this.x = x
    this.y = y
    this.print = () => { console.log(`Point : ${this.x}, ${this.y}`) }
}

const p1 = new Point(5, 7)
p1.print() // p1 => this

const zas = p1.print
zas()


function outer(label) {
    return function inner() {
        console.log(label)
    }
}

outer('space')()
outer('odity')()