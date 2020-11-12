'use strict'

const urlib = require('urllib')
const fs = require('fs')
const vinyl = require('./../lib/repo/vinyl')
require('./../lib/repo/users').init('./__tests__/mocks/users.json')

jest.mock('urllib')

const LAURINDA_TOPTRACKS = [
    'Friday I\'m in Love',
    'Just Like Heaven',
    'Boys Don\'t Cry',
    'Just Like Honey',
    'April Skies',
    'The Living End'
]

test('Test top tracks for Laurinda', done => {
    urlib.request.mockImplementation(urlibRequestMock)
    vinyl.getTopTracks('laurinda', 3, (err, tracks) => {
        expect(err).toBeFalsy()
        tracks.forEach((t, i) => {
            expect(t).toBe(LAURINDA_TOPTRACKS[i])
        })
        done()
    })
})

/**
 * @param {String} url 
 * @param {function(Error, String)} cb 
 */
function urlibRequestMock(url, cb) {
    if(url.includes('cure'))
        fs.readFile('./__tests__/mocks/toptracks-cure.json', cb)
    else if(url.includes('jesus'))
        fs.readFile('./__tests__/mocks/toptracks-jesus-and-mary-chain.json', cb)
    else 
        cb(Error('Missing mock for given artist!'))
}