'use strict'

const urllib = require('urllib')
const asyncutils = require('./../../asyncutils')

class Bundles {

    constructor(es) {
        this.urlBooks =  `http://${es.host}:${es.port}/${es.books_index}/_doc/`
        this.urlBundles = `http://${es.host}:${es.port}/${es.bundles_index}/_doc/`
    }

    static init(es) {
        return new Bundles(es)    
    }

    get(id, cb) {
        const url = `${this.urlBundles}${id}`
        urllib.request(url, (err, body, res) => {
            if(!checkError(200, cb, err, res, body))
                cb(null, JSON.parse(body)._source)
        })
    }
    delete(id, cb) {
        const url = `${this.urlBundles}${id}`
        const options = { method: 'DELETE' }
        urllib.request(url, options, (err, body, res) => {
            if(!checkError(200, cb, err, res, body))
                cb(null, JSON.parse(body))
        })

    }
    create(name, cb) {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            content: JSON.stringify({
                'name': name, 
                'books': [] 
            })
        }
        urllib.request(this.urlBundles, options, (err, body, res) => {
            if(!checkError(201, cb, err, res, body))
                cb(null, JSON.parse(body))
        })
    }
    
    /**
     * @param {String} id Id of the bundle
     * @param {String} pgid Project gutrnberg book id 
     * @param {function(Error)} cb 
     */
    addBook(id, pgid, cb){
        const task1 = cb => this.get(id, cb)
        const task2 = cb => { 
            const url = `${this.urlBooks}${pgid}`
            urllib.request(url, (err, body, res) => { // Check the book
                if(!checkError(200, cb, err, res, body)) {
                    const book = JSON.parse(body)._source      
                    cb(null, book)
                }
            })
        }
        asyncutils.parallel([task1, task2], (err, res) => {
            const [bundle, book] = res
            if(err) return cb(err)
            const idx = bundle.books.findIndex(b => b.id == pgid)
            if(idx >= 0) 
                return cb(null)  // If the book already exists in bundle do nothing
            // Insert Book in Bundle and save to ElasticSearch through an HTTP request
            bundle.books.push({
                'id': pgid,
                'title': book.title
            })
            const opt = options('PUT', bundle)
            urllib.request(`${this.urlBundles}${id}`, opt, (err, body, res) => {
                if(!checkError(200, cb, err, res, body)) {
                    cb(null, JSON.parse(body))
                }
            })
        })
    }
}

function options(method, content) {
    return {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        content: JSON.stringify(content)
    }
}

function checkError(successCode, cb, err, res, body) {
    if(err) {
        cb(err)
        return true
    }
    if(res.statusCode != successCode) {
        const err = new Error(res.statusMessage)
        err.code = res.statusCode
        err.error = body
        cb(err)
        return true
    }
    return false
}

module.exports = Bundles