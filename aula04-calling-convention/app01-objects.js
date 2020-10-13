function Student(nr, name) { 
    this.nr = nr,
    this.name = name
    this.toString = function() { return 'I am a Student with nr ' + this.nr }
} 

function Account(id, balance) { 
    this.id = id,
    this.balance = balance
    this.toString = function() { return 'I am an Account ' + this.id }
} 

/*
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    module() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
}*/
// <=>

function Point(x, y) {
    this.x = x
    this.y = y
}
// Not Enumerable Property:
// 
Object.defineProperty(Point.prototype, 'module', {
    value: function() {
        return Math.sqrt(this.x*this.x + this.y*this.y)
    }
})
// Enumerable Property:
// 
// Point.prototype.module = function() {
//    return Math.sqrt(this.x*this.x + this.y*this.y)
// }


function inspect(obj){
    // let str = typeof(obj) + ': '
    let str = obj.constructor.name + ': '
    str += getObjectProperties(obj, obj)
    str += getObjectProperties(obj.constructor.prototype, obj)
    console.log(str)
}

function getObjectProperties(obj, target) {
    let str = ''
    for(let key of  Object.getOwnPropertyNames(obj)){
        //key - name of prop
        //obj[key] - value
        //obj[key]() - to incoke if it is a function
        const propType = typeof(obj[key]) 
        if(propType == 'function' ) {
            if(obj[key].length == 0) // Is it parameter less ?
                str += key + " = " + target[key]()
        } else {
            str += key + " = " + obj[key]
        }
        str += ', '
    }
    return str
}

const s1 = new Student(163531, 'Ze Manel')
const s2 = new Student(76354, 'Maria Papoila')
const a1 = new Account(4314, 7800)
const a2 = new Account(2543, 9400)
const p1 = new Point(3,7)

inspect(s1)
inspect(s2)
inspect(a1)
inspect(a2)
inspect(p1)