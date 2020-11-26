'use strict'

const urllib = require('urllib')

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
        this.get(id, (err, bundle) => { // Get the Bundle
            if(err) 
                return cb(err)
            const url = `${this.urlBooks}${pgid}`
            urllib.request(url, (err, body, res) => { // Check the book
                if(!checkError(200, cb, err, res, body)) {
                    const book = JSON.parse(body)._source
                    const idx = bundle.books.findIndex(b => b.id == pgid)
                    if(idx >= 0) 
                        return cb(null)  // If the book already exists in bundle do nothing
                    bundle.books.push({
                        'id': pgid,
                        'title': book.title
                    })
                    const options = {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        content: JSON.stringify(bundle)
                    }
                    urllib.request(`${this.urlBundles}${id}`, options, (err, body, res) => {
                        if(!checkError(200, cb, err, res, body)) {
                            cb(null, JSON.parse(body))
                        }
                    })
                }
            })
        })
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