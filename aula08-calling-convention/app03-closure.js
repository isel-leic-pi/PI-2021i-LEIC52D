'use strict'

function Point(x, y) {
    this.print = function () { console.log(`Point : ${x}, ${y}`) } // x and y are Point parameters
}

const p1 = new Point(5, 7)

p1.print()
p1.x = 11  
p1.print() 

/*
function outer(label) {
    return function inner() {
        console.log(label)   // label is outer parameter
    }
}

outer('space')()
outer('odity')()
*/