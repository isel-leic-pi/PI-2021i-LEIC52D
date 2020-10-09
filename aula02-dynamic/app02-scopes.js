'use strict'

/* use strict proibe a utilização abaixo de str

function foo() {
    str = 'ola mundo' // O scope de str NÃO é apenas foo() => str é global
    console.log(str)
}
foo()
console.log(str)
*/

function foo() {
    const str = 'ola mundo' // O scope de str NÃO é apenas foo() => str é global
    console.log(str)
}

function bar(nr) {
    for (var index = 0; index < nr; index++) { // scope do index => for {}
        console.log(index)
    }
    console.log(index)
}
const str = 'hello'
foo()
console.log(str)

bar(5) // 0 1 2 3 4 

