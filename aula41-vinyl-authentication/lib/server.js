'use strict'

const express = require('express')
const routesApi = require('./routes/routes-vinyl-api')
const routesWeb = require('./routes/routes-vinyl-web')
const sitemap = require('express-sitemap-html')
const bodyParser = require('body-parser')
const passport = require('passport')
let server

function init(usersPath, done) {
    if(usersPath)
        require('./repo/users').init(usersPath)
    const app = express()
    app.set('view engine', 'hbs')
    app.set('views', './lib/views')
    /**
     * Routes util
     */
    app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
    /**
     * Setup passport
     */
    app.use(require('cookie-parser')())
    app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
    app.use(passport.initialize())
    app.use(passport.session())
    /**
     * Routes domain
     */
    app.use('/api', routesApi)
    app.use(routesWeb)
    sitemap.swagger('Vinyl', app)
    
    /**
     * Error Handler
     */
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