'use strict'

const lastfm = require('./../lib/lastfm')
const fs = require('fs').promises

jest.mock('node-fetch')
const fetch = require('node-fetch')
const Response = jest.requireActual('node-fetch').Response

const cure = [
    'Friday I\'m in Love',
    'Just Like Heaven',
    'Boys Don\'t Cry'
]

test('Test lastfm module getUser successfuly', () => {
    fetch.mockReturnValue(fs
        .readFile('./__tests__/mocks/toptracks-cure.json') // Promise<String>
        .then(data => new Response(data))                  // Promise<Response<String>>
    )
    return lastfm
        .getTopTracks('cure')
        .then(tracks => cure.forEach((t, i) => expect(t).toBe(tracks[i])))
        .catch(err => expect(err).toBeFalsy())
})
