/* eslint-disable no-undef */
'use strict'

const users = require('./../lib/users').init('./__tests__/mocks/users.json')

test('Test users module getUser successfuly', done => {
    users.getUser('laurinda', (err, user) => {
        // Assert that does not exist err
        expect(err).toBeFalsy()

        // Assert that user is gamboa
        expect(user.username).toBe('laurinda')
        done()
    })
})

test('Test users module getUser for absent username', done => {
    users.getUser('jose', (err, user) => {
        // Assert that does not exist err
        expect(err).toBeTruthy()
        done()
    })
})