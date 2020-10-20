'use strict'

function foo() {
    console.log('Ola')
}

foo()

const bar = function() {
    console.log('I am anonynous') 
}

bar()

function Point(x, y) {
    this.x = x
    this.y = y
    this.print = function () { console.log(`Point : ${this.x}, ${this.y}`) }
}

const p1 = new Point(5, 7)
const p2 = new Point(3, 9)
p1.print() // p1 => this

const zas = p1.print

// zas()      // this undefined Error !!!!!

zas.apply(p1)
zas.apply(p2)

const zasOfP1 = zas.bind(p1)
zasOfP1()

/*
 * 1º argumento de zasOfP1 é o 2º argumento de zas ou print.
 */
zasOfP1.apply(p2) // p2 é ignorado

/*
 * <=> zas.bind(p2)
 */
const zasOfP2 = function() {
    return zas.apply(p2, arguments)
}
zasOfP2()