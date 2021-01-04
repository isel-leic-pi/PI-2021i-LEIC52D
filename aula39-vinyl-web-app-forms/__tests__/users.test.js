/* eslint-disable no-undef */
'use strict'

const users = require('./../lib/repo/users').init('./__tests__/mocks/users.json')

test('Test users module getUser successfuly', () => {
    return users
        .getUser('laurinda')
        .then(user => expect(user.username).toBe('laurinda')) // Assert that user is gamboa
        .catch(err => expect(err).toBeFalsy())                // Assert that does not exist err
})

test('Test users module getUser for absent username', () => {
    return users
        .getUser('jose')
        .then(user => expect(user).toBeFalsy())
        .catch(err => expect(err).toBeTruthy()) // Assert that exists err
})