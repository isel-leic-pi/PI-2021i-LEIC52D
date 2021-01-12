'use strict'

const users = require('./../repo/users').init()
const passport = require('passport')
const router = require('express').Router()

module.exports = router

router.get('/vinyl/login', (req, res) => {
    const err = req.flash('userError')
    if(err) {
        res.render('login', {
            'messages': {
                'error': err
            }
        })
    } else
        res.render('login')
    
})

router.post('/vinyl/login', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    users
        .getUser(username)
        .then(user => {
            if(!user) {
                req.flash('userError', `User ${username} does not exist!`)
                return res.redirect('/vinyl/login')
            }
            if(user.password != password){
                req.flash('userError', 'Invalid credentials!')
                return res.redirect('/vinyl/login')
            }
            req.logIn(user, (err) => {
                if(err) next(err)
                else res.redirect('/vinyl/users')
            })
        })
        .catch(next)
})

function UserError(status, message) {
    const err = Error(message)
    err.status = status
    return err
}



passport.serializeUser(function(user, done) {
    done(null, user.username)
})
  
passport.deserializeUser(function(username, done) {
    users
        .getUser(username)
        .then(user => done(null, user))
        .catch(done)
})