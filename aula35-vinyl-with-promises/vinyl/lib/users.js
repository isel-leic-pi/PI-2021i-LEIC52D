'use strict'

const fs = require('fs')

let usersPath = './data/users.json'

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
    fs.readFile(usersPath, (err, buffer) => {
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
 * @param {function(Error)} cb 
 */
function addArtist(username, artist, cb) {
    fs.readFile(usersPath, (err, buffer) => {
        if(err) return cb(err)
        const arr = JSON.parse(buffer)
        const selected = arr.filter(user => user.username == username)
        if(selected.length == 0) return cb(new Error('There is no user ' + username))
        const user =  selected[0]
        user.artists.push(artist)
        fs.writeFile(usersPath, JSON.stringify(arr, null, 4), cb)
    })
}

function init(path) {
    if(path) usersPath = path
    return {
        getUser,
        addArtist,
        addUser
    }
}

module.exports = { init }