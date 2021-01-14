'use strict'

const vinyl = require('../repo/vinyl')
const users = require('../repo/users').init()
const Router = require('express').Router
const router = Router()

module.exports = router

router.get('/vinyl/users/:username/toptracks', isAuthenticated, handlerUserTopTracks)
router.post('/vinyl/users/:username', isAuthenticated, handlerUserAddArtist)
router.get('/vinyl/users/:username', isAuthenticated, handlerUserDetails)
router.get('/vinyl/users', handlerAllUsers)

function isAuthenticated(req, res, next) {
    if(req.user) next()
    else res.redirect('/vinyl/login')
}

function handlerUserTopTracks (req, resp, next) {
    const limit = req.query.limit | 3
    const username = req.params.username
    vinyl
        .getTopTracks(username, limit)
        .then(tracks => resp.json(tracks))
        .catch(next)
}


function handlerUserAddArtist (req, resp, next) {
    const username = req.params.username
    const artist = req.body.artist
    vinyl
        .addArtist(username, artist)
        .then(() => resp.redirect('/vinyl/users/' + username))
        .catch(next)
}

function handlerUserDetails (req, resp, next) {
    const username = req.params.username
    users
        .getUser(username)
        .then(user => {
            if(!user) {
                const err = new Error('There is no user with username: ' + username)
                err.status = 404
                return next(err)
            }
            user.artists = user
                .artists
                .map((a, idx) => ({ 'name': a, 'id': idx }))
            resp.render('userDetails', user)
        })
        .catch(next)
}

function handlerAllUsers (req, resp, next) {
    const host = req.headers.host
    users
        .getUsers()
        .then(users => resp.render('usersListing', { 'users': users.map(user => {
            user.details = `http://${host}/vinyl/users/${user.username}`
            user.toptracks = `http://${host}/vinyl/users/${user.username}/toptracks`
            return user
        })}))
        .catch(next)
}
