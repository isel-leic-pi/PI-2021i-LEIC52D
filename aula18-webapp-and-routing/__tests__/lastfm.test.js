/* eslint-disable no-undef */
'use strict'

const lastfm = require('./../lib/lastfm')
const urlib = require('urllib')
const fs = require('fs')

jest.mock('urllib')

const cure = [
    'Friday I\'m in Love',
    'Just Like Heaven',
    'Boys Don\'t Cry'
]

test('Test lastfm module getUser successfuly', done => {
    urlib.request.mockImplementationOnce((url, cb) => {
        fs.readFile('./__tests__/mocks/toptracks-cure.json', cb)
    })

    lastfm.getTopTracks('cure', (err, tracks) => {
        expect(err).toBeFalsy()
        cure.forEach((t, i) => {
            expect(t).toBe(tracks[i])
        })
        done()
    })
})
