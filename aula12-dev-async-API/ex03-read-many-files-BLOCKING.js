'use strict'

const fs = require('fs')

const files = [
    'Metamorphosis-by-Franz-Kafka.txt', 
    'The-History-of-Tom-Thumb-and-Others.txt', 
    'The-Wizard-by-Rider-Haggard.txt'
]

function fileSize(path) {
    console.log('Reading ' + path)
    const buffer = fs.readFileSync(path)
    const size = buffer.toString().length
    console.log(`>>>>> ${path}: ${size}`)
}

files.forEach(fileSize)