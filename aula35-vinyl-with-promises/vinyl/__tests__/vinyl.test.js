/* eslint-disable no-undef */
'use strict'

const users = require('./../lib/users').init('./__tests__/mocks/users.json')
const vinyl = require('./../lib/vinyl')
const exec = require('child_process').exec


afterEach(done => {
    exec('git checkout HEAD -- __tests__\\mocks\\users.json')
    done()
})

test('Add artist to user', () => {
    return vinyl
        .addArtist('laurinda', 'weeknd')
        .then(() => users.getUser('laurinda'))
        .then(lau => {
            const weeknd = lau.artists.find(a => a === 'The Weeknd')
            expect(weeknd).toBeTruthy()
        })
        .catch(err => {
            expect(err).toBeFalsy()
        })
})

test('Add artist to absent user', () => {
    return vinyl
        .addArtist('ldjfladj', 'weeknd')
        .then(() => fail(Error('Should not succeed because user does not exist!')))
        .catch(err => expect(err).toBeTruthy())
})

test('Add absent artist to right user', () => {
    return vinyl
        .addArtist('laurinda', 'kjsdhfgkh')
        .then(() => fail(Error('Should not succeed because artist does not exist!')))
        .catch(err => expect(err).toBeTruthy())
})

test('Get Top tracks', () => {
    return vinyl
        .getTopTracks('laurinda', 3)
        .then(tracks => {
            expect(tracks.length).toBe(EXPECTED.length)
            tracks.forEach(name =>
                expect(name).toBe(EXPECTED.find(track => track === name)))
        })
})

const EXPECTED = [
    'Supermassive Black Hole',
    'Starlight',
    'Time Is Running Out',
    'Somebody Told Me',
    'Mr. Brightside',
    'Smile Like You Mean It',
    'Blue Monday',
    'Bizarre Love Triangle',
    'Ceremony'
]