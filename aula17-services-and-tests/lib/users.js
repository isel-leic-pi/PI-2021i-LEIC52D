'use strict'

const fs = require('fs')

const USERS_PATH = './data/users.json'

/**
 * @typedef User
 * @property {String} username
 * @property {Array} artists Array of strings with artists names.
 */
/**
 * @param {String} username 
 * @param {function(Error, User)} cb 
 */
function getUser(username, cb) {
    fs.readFile(USERS_PATH, (err, buffer) => {
        if(err) return cb(err)
        const arr = JSON.parse(buffer)
        const selected = arr.filter(user => user.username == username)
        if(selected.length == 0) return cb(new Error('There is no user ' + username))
        cb(null, selected[0])
    })
}

/**
 * Add a new User object with given username if it does not exist yet.
 * Returns an Error if that username already exist.
 * @param {String} username 
 * @param {function(Error)}
 */
function addUser(username, cb) {

}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * I does not verify repetitions among artists.
 * 
 * @param {String} username 
 * @param {String} artist 
 * @param {function(Error, User)} cb 
 */
function addArtist(username, artist, cb) {

}

module.exports = {
    getUser,
    addArtist,
    addUser
}