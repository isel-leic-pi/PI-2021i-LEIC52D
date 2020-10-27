'use strict'

const fs = require('fs')

const files = [
    'The-Wizard-by-Rider-Haggard.txt',
    'Metamorphosis-by-Franz-Kafka.txt', 
    'The-History-of-Tom-Thumb-and-Others.txt'
]

function fileSize(path) {
    console.log('Reading ' + path)
    fs.readFile(path, (err, buffer) => {
        if(err) console.log(err)
        else {
            const size = buffer.toString().length
            console.log(`>>>>> ${path}: ${size}`)        
        }
    })
}

files.forEach(fileSize)