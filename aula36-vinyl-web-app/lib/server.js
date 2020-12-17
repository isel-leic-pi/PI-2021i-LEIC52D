'use strict'

const express = require('express')
const routes = require('./routes/routes-vinyl')
let server

function init(usersPath, done) {
    if(usersPath)
        require('./repo/users').init(usersPath)
    const app = express()
    app.use(routes)
    app.use((err, req, resp, next) => {
        if(err.status) resp.status(err.status)
        else (resp.status(500))
        resp.send(JSON.stringify(err, Object.getOwnPropertyNames(err)))
        console.log(err)
    })
    server = app.listen(8000, () => {
        console.log('Listening for HTTP requests on port 8000')
        if (done) done()
    })   
}

function close() {
    server.close()
}

module.exports = { init, close }