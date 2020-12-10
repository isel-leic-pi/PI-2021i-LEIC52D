'use strict'

const ok = Promise.resolve().then(() => 'ok') // Fullfiled with 'ok'
const err = Promise.resolve().then(() => { throw new Error('rejected') }) // Rejected

forward(ok)
forward(err)

function forward(prm) {
    prm
        .then(val => console.log(val), err => { console.log('1: ' + err.message); throw err }) // Fulfiled
        .catch(err => console.log('2: ' + err.message))
        .then(val => console.log(val))
}