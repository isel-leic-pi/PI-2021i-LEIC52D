'use strict'

const users = require('./../repo/users').init()
const passport = require('passport')
const router = require('express').Router()

module.exports = router

router.get('/vinyl/login', (req, res) => {
    res.render('login')
})


passport.serializeUser(function(user, done) {
    done(null, user.username)
})
  
passport.deserializeUser(function(username, done) {
    users
        .getUser(username)
        .then(user => done(null, user))
        .catch(done)
})