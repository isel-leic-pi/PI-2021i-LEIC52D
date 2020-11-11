'use strict'

const vinyl = require('./../repo/vinyl')
const users = require('./../repo/users').init()

function getUsersTopTracks(username, params, cb) {
    vinyl.getTopTracks(username, params.get('limit'), (err, tracks) => {
        if(err) return cb({ 
            'status': 500,
            'msg': err.toString()
        })
        cb(null, tracks)
    })
}

function getUserDetails(username, cb) {
    users.getUser(username, (err, user) => {
        if(err) return cb({ 
            'status': 500,
            'msg': err.toString()
        })
        if(!user) return cb({ 
            'status': 404,
            'msg': 'There is no user with username: ' + username
        })
        cb(null, user)
    })
}

function getUsers(cb) {
    users.getUsers((err, users) => {
        if(err) return cb({ 
            'status': 500,
            'msg': err.toString()
        })
        cb(null, users)
    })
}

module.exports = {
    getUsersTopTracks, 
    getUserDetails, 
    getUsers
}