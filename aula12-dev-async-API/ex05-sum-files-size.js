'use strict'

const fs = require('fs')

const files = [
    'The-Wizard-by-Rider-Haggard.txt',
    'Metamorphosis-by-Franz-Kafka.txt', 
    'The-History-of-Tom-Thumb-and-Others.txt'
]

/**
 * 
 * @param {*} path Path to the file that we will read.
 * @param {(err, Number) => void} cb The result wil be provided to the clck.
 */
function fileSize(path, cb) {
    console.log('Reading ' + path)
    fs.readFile(path, (err, buffer) => {
        if(err) cb(err)
        else {
            const size = buffer.toString().length
            cb(null, size)
        }
    })
}

function sumFilesSize(files, cb) {
    let sum = 0
    let count = 0
    files.forEach(file => {
        fileSize(file, (err, size) => {
            count++
            if(err) cb(err)
            else {
                sum += size
                if(count == files.length)
                    cb(null, sum)
            }
        })
    })
}

sumFilesSize(files, (err, sum) => {
    if(err) console.log(err)
    else console.log('Files size = ' + sum)
})
