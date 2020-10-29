'use strict'

const fs = require('fs')

const FILE_USERS = './data/users.json'

/**
 * @typedef {Object} User
 * @property {String} username
 * @property {Array} Array
 */
/**
 * @param {String} username 
 * @param {funciton(Error, User)} callback A callback to run.
 */
function getUser(username, cb) {
    fs.readFile(FILE_USERS, (err, buffer) => {
        if(err) cb(err)
        else {
            const body = JSON.parse(buffer.toString())
            const users = body.filter(u => u.username == username)
            if(users.length == 0) 
                return cb(Error('Non existent ' + username))
            cb(null, users[0])
        }
    })
}

module.exports = {
    getUser
}