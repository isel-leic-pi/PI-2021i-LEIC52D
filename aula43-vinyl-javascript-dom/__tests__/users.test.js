/* eslint-disable no-undef */
'use strict'

const exec = require('child_process').exec
const users = require('./../lib/repo/users').init('./__tests__/mocks/users.json')

afterEach(done => {
    exec('git checkout HEAD -- __tests__\\mocks\\users.json')
    done()
})


test('Test users module getUser successfuly', () => {
    return users
        .getUser('laurinda')
        .then(user => expect(user.username).toBe('laurinda')) // Assert that user is laurinda
        .catch(err => expect(err).toBeFalsy())                // Assert that does not exist err
})

test('Test users module getUser for absent username', () => {
    return users
        .getUser('jose')
        .then(user => expect(user).toBeFalsy())
        .catch(err => expect(err).toBeTruthy()) // Assert that exists err
})

test('Test users module remove artist killers successfuly', () => users
    .removeArtist('laurinda', 'killers')   // Remove Killers from Laurinda
    .then(() => users.getUser('laurinda')) // Get laurinda again
    .then(user => expect(user.artists).not.toContain('killers'))
    .catch(err => expect(err).toBeFalsy()) /* Assert that does not exist err*/)

