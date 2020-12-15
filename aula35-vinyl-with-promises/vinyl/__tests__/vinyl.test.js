/* eslint-disable no-undef */
'use strict'

const users = require('./../lib/users').init('./__tests__/mocks/users.json')
const vinyl = require('./../lib/vinyl')
const exec = require('child_process').exec


afterAll(done => {
    exec('git checkout HEAD -- __tests__\\mocks\\users.json')
    done()
})

test('Add artist to user', done => {
    vinyl.addArtist('laurinda', 'weeknd', (err) => {
        expect(err).toBeFalsy()
        users
            .getUser('laurinda')
            .then(lau => {
                const weeknd = lau.artists.find(a => a === 'The Weeknd')
                expect(weeknd).toBeTruthy()
            })
            .catch(err => {
                expect(err).toBeFalsy()
            })
            .then(() => done())
    })
})

test('Add artist to absent user', done => {
    vinyl.addArtist('ldjfladj', 'weeknd', (err) => {
        expect(err).toBeTruthy()
        done()
    })
})

test('Add absent artist to right user', done => {
    vinyl.addArtist('laurinda', 'kjsdhfgkh', (err) => {
        expect(err).toBeTruthy()
        done()
    })
})


// Add 2 tests that throw Error