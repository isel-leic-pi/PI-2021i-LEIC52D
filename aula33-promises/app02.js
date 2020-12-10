'use strict'

function delay(timeout, success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(success) resolve('SUCCEEDED')
            else reject(Error('REJECTED'))
        }, timeout)
    }) // Pending
}


const ok = delay(1000, true) 
const err = delay(1000, false)

forward(ok)
forward(err)

function forward(prm) {
    prm
        .then(val => console.log(val))
        .catch(err => console.log(err.message))
}