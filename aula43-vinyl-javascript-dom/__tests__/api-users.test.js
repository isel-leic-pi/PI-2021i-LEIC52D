'use strict'

const frisby = require('frisby')
const server = require('./../lib/server')
const exec = require('child_process').exec

// eslint-disable-next-line no-undef
afterEach(done => {
    exec('git checkout HEAD -- __tests__\\mocks\\users.json')
    done()
})


// eslint-disable-next-line no-undef
beforeAll(done => {
    server.init('./__tests__/mocks/users.json', done)
})

// eslint-disable-next-line no-undef
afterAll(() => {
    server.close()
})

// eslint-disable-next-line no-undef
test('Test users route to get all users', () => frisby
    .get('http://localhost:8000/api/vinyl/users')
    .expect('status', 200)
    .expect('json', '[0]', EXPECTED_USERS[0])
    .expect('json', '[1]', EXPECTED_USERS[1])
)

// eslint-disable-next-line no-undef
test('Test users route to get laurinda', () => frisby
    .get('http://localhost:8000/api/vinyl/users/laurinda')
    .expect('status', 200)
    .expect('json', 'username', 'laurinda')
    .expect('json', 'artists', ['muse', 'killers', 'new order'])
)

// eslint-disable-next-line no-undef
test('Test users route for unknown username', () => frisby
    .get('http://localhost:8000/api/vinyl/users/blabla')
    .expect('status', 404)
)

test('Test users route remove artist successfuly', () => frisby
    .del('http://localhost:8000/api/vinyl/users/laurinda/artists/killers')
    .expect('status', 200)
)

test('Test users route remove unkown artist', () => frisby
    .del('http://localhost:8000/api/vinyl/users/laurinda/artists/khkfhd')
    .expect('status', 400)
)


const EXPECTED_USERS = [
    {
        'username': 'laurinda',
        'artists': [
            'muse', 
            'killers', 
            'new order'
        ],
        'details': 'http://localhost:8000/vinyl/users/laurinda',
        'toptracks': 'http://localhost:8000/vinyl/users/laurinda/toptracks'
    },
    {
        'username': 'baptista',
        'artists': [
            'police',
            'james'
        ],
        'details': 'http://localhost:8000/vinyl/users/baptista',
        'toptracks': 'http://localhost:8000/vinyl/users/baptista/toptracks'
    }
]