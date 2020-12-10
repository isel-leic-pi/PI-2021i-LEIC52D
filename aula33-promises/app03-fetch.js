'use strict'

const fetch = require('node-fetch')

function delay(timeout, success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(success) resolve('SUCCEEDED')
            else reject(Error('REJECTED'))
        }, timeout)
    }) // Pending
}

/**
 * 
 * @param {Promise<Number>} url 
 */
function getStatusCode(url) {
    return fetch(url)
        .then(res => {
            if(res.status >= 200 && res.status < 300) return res.status
            else throw new Error('status code: ' + res.status)
        })
}

forward('https://www.npmjs.com/package/node-fetch')
forward('https://www.npmjs.com/package/asdfsaddfdsf')

/**
 * @param {String} url 
 */
function forward(url) {
    delay(1000, true)        // Promise<String> <=> map() <=> thenApply()
        .then(() => url)     // Promise<String> <=> map()
        .then(getStatusCode) // Promise<Promise<Number>> <=> flatMap <=> thenCompose()
        .then(console.log)
        .catch(console.log)
}
