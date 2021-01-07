'use strict'

const express = require('express')
const sitemap = require('express-sitemap-html')
const bodyParser = require('body-parser')
const passport = require('passport')
const flash = require('connect-flash')

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
    app.use(flash())
    /**
     * Add login() to req --- req.login(User):
     * 1) passport.serializeUser --- User ---> User ID
     * 2) saves on session User ID
     */
    app.use(passport.initialize())
    /**
     * Session ----> User ID ----> User -----> req.user
     * converts User ID in User through passport.deserializeUser
     */ 
    app.use(passport.session())    // 
    /**
     * Routes domain
     */
    app.use('/api', require('./routes/routes-vinyl-api'))
    app.use(require('./routes/routes-vinyl-web'))
    app.use(require('./routes/routes-vinyl-auth'))
    sitemap.swagger('Vinyl', app)
    
    /**
     * Error Handler
     */
    app.use((err, req, resp, next) => {
        if(err.status) resp.status(err.status)
        else (resp.status(500))
        resp.render('error', {
            'status': err.status,
            'message': err.message,
            'stack': err.stack
        })
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