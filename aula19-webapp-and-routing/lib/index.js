'use strict'

const http = require('http')

const PATH_USERS = '/vinyl/users'
const PATH_USERS_DETAILS = new RegExp('/vinyl/users/(.*)')
const PATH_USERS_TOPTRACKS = /\/vinyl\/users\/(.*)\/toptracks/


const server = http.createServer((req, resp) => {
    req.url.match(PATH_USERS)
})

server.listen(8000)