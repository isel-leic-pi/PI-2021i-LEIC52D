
// Opção 1 -- Função construtora
function Student(nr) { this.nr = nr } // ? qual o tipo da propriedade nr ??? Não sabemos

// Opção 2 -- Literal -- JSON
function makeStudent(nr, address) {
    return {
        'nr': nr,
        'address': address,
        'print': function() { console.log('I am a Studen with nr: ' + this.nr ) }
    }
}

var student = new Student(798)
var std2 = makeStudent(163531, 'Rua das papoilas')

console.log(student.nr)
console.log(std2)

std2.print()
console.log(std2.address)                         // propriedade address armazena uma String
std2.address = function() { console.log('Ola') }  // propriedade address armazena uma Function =>  address é um Método
console.log(std2.address)
std2.address()

console.log(typeof(student)) // Object 
console.log(typeof(std2))    // Object

console.log(`student is Student? ${student instanceof Student}`) // true
console.log(`std2 is Student? ${std2 instanceof Student}`) // false

console.log(student.constructor.prototype) // Student
console.log(std2.constructor.prototype)    // Object

// student.constructor.prototype.print = function() { console.log('I am a Studen with nr: ' + this.nr ) }
Student.prototype.print = function() { console.log('I am a Studen with nr: ' + this.nr ) }
student.print() // I am a Studen with nr: 798

var student2 = new Student(666)
student2.print() // ??????

