// Opção 1
function Student(nr) { this.nr = nr } // ? qual o tipo da propriedade nr ??? Não sabemos

// Opção 2
function makeStudent(nr, address) {
    return {
        'nr': nr,
        'address': address
    }
}

var student = new Student(798)
var std2 = makeStudent(163531, 'Rua das papoilas')

console.log(student.nr)
console.log(student.name) // name não existe
console.log(std2)

student.nr = 'Maria'     // afectar a propriedade com valor de outro tipo
student.name = 'Ze Manel' // a propriedade name é adicionada ao objecto 
console.log(student.nr)
console.log(student.name)

console.log(typeof(student))
console.log(typeof(student.nr))
console.log(typeof(Student))


// !!!! Playground => don't do it!
// 
const dummy = Student
const s = new dummy(56)
console.log(s.nr)