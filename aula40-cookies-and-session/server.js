'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
/**
 * Add express handlers (Middlewares)
 */
app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
// app.use(require('cookie-parser')()) // Add req.cookies and res.cookie(...) that set headers Set-Cookie (zero or more)
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use((req, res, next) => {
    /*
        console.log(req.cookies)
        next()
    */
    console.log(req.session)
    next()
})

app.get('/hello/:bro', (req, res) => {
    /*
        res.cookie('boss', 'gamboa')
        res.cookie('bro', req.params.bro, {
            'maxAge': new Date(Date.now() + 90000)
        })
        res.send('Hello')
    */
    req.session.boss = 'gamboa'
    req.session.bro = req.params.bro
    res.send('Hello')
})
/**
 * Run server
 */
app.listen(8000, () => {
    console.log('Listening for HTTP requests on port 8000')
})   
