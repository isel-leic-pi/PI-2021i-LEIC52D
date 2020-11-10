'use strict'

const http = require('http')
const routes = require('./routes/routes-vinyl')


const PATH_USERS = '/vinyl/users'
const PATH_USERS_DETAILS = /\/vinyl\/users\/(.*)/
const PATH_USERS_TOPTRACKS = /\/vinyl\/users\/(.*)\/toptracks/


const server = http.createServer((req, resp) => {
    let path
    if((path = req.url.match(PATH_USERS_TOPTRACKS))) {
        routes.getUsersTopTracks(path[1], req.url, (err, user) => send(resp, err, user))
    } else if((path = req.url.match(PATH_USERS_DETAILS))) {
        routes.getUserDetails(path[1], (err, user) => send(resp, err, user))
    } else if(req.url.match(PATH_USERS)) {
        routes.getUsers((err, users) => send(resp, err, users))
    } else {
        resp.writeHead(404, 'Resource not found!!!!!')
        resp.end()
    }
})

function send(resp, err, payload) {
    if(err) {
        resp.writeHead(err.status)
        resp.end(err.msg)
        return
    }
    const json = JSON.stringify(payload)
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    })
    resp.end(json)
}

server.listen(8000, () => console.log('Listening for HTTP requests on port 8000'))