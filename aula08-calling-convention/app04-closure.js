'use strict'

function Point(x, y) {
    this.x = x
    this.y = y
    this.print = function () { console.log(`Point : ${x}, ${y}`) }
}

const p1 = new Point(5, 7)
p1.print() // Point: 5, 7
p1.x = 11  
p1.print() // Point: 11, 7 ????
