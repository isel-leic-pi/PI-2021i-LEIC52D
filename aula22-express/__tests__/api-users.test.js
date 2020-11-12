'use strict'

const frisby = require('frisby')
const path = require('path')
const fork = require('child_process').fork
const app = fork('./lib/index.js', [path.join(process.cwd(), '/__tests__/mocks/users.json')])
const fs = require('fs')

let EXPECTED_USERS = [
    {
        "username": "laurinda",
        "artists": ["cure", "jesus and mary chain"]
    },
    {
        "username": "baptista",
        "artists": ["james", "police"]
    }
]

it('Test route to get all users', () => frisby
    .get('http://localhost:8000/vinyl/users')
    .expect('status', 200)
    .expect('json', '[0]', EXPECTED_USERS[0])
    .expect('json', '[1]', EXPECTED_USERS[1])
)

it('Test route to get user laurinda', () => frisby
    .get('http://localhost:8000/vinyl/users/laurinda')
    .expect('status', 200)
    .expect('json', 'username', 'laurinda')
    .expect('json', 'artists', ["cure", "jesus and mary chain"])
)

afterAll(() => {
    app.kill()
})