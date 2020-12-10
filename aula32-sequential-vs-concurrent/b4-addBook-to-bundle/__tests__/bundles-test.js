'use strict'

const Bundles = require('./../lib/bundles.js')

const es = {
    host: 'localhost',
    port: '9200',
    books_index: 'books',
    bundles_index: 'bundles'
}

it('should create a bundles service object!', done => {
    const service = Bundles.init(es) // <=> new Bundles(es)
    expect(service.urlBooks).toBe('http://localhost:9200/books/_doc/')
    expect(service.urlBundles).toBe('http://localhost:9200/bundles/_doc/')
    done()
})

it('should create a new bundle object and get it and delete it!', done => {
    const service = Bundles.init(es)
    service.create('action', (err, data) => {
        expect(err).toBeFalsy()
        expect(data._id).toBeTruthy()
        const id = data._id
        service.get(id, (err, bundle) => {
            expect(err).toBeFalsy()
            expect(bundle.name).toBe('action')
            service.delete(id, (err) => {
                expect(err).toBeFalsy()
                service.get(id, (err) => {
                    expect(err).toBeTruthy()
                    expect(err.code).toBe(404)
                    done()
                })
            })
        })
    })
})
it('should create a new bundle object and add it a book!', done => {
    const service = Bundles.init(es)
    service.create('action', (err, data) => {
        expect(err).toBeFalsy()
        expect(data._id).toBeTruthy()
        const id = data._id
        service.addBook(id, 'pg18381', (err) => {
            expect(err).toBeFalsy()
            service.get(id, (err, bundle) => {
                expect(err).toBeFalsy()
                expect(bundle.name).toBe('action')
                expect(bundle.books[0].title).toBe('De Lotgevallen van Tom Sawyer')
                service.delete(id, (err) => {
                    expect(err).toBeFalsy()
                    service.get(id, (err) => {
                        expect(err).toBeTruthy()
                        done()
                    })
                })
            })            
        })
    })
})
