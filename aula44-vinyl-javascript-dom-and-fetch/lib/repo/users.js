'use strict'

const fs = require('fs').promises

let usersPath = './data/users.json'

function getUsers() {
    return fs
        .readFile(usersPath)
        .then(buffer => JSON.parse(buffer))
}

/**
 * @typedef User
 * @property {String} username
 * @property {Array} artists Array of strings with artists names.
 * @property {String} password
 */
/**
 * @param {String} username 
 * @returns {Promise<User>}
 */
function getUser(username) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            return selected.length == 0 ? null : selected[0]
        })
}

/**
 * Add a new User object with given username if it does not exist yet.
 * Returns an Error if that username already exist.
 * @param {String} username 
 */
function addUser(username) {
}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * It does not verify repetitions among artists.
 * 
 * @param {String} username 
 * @param {String} artist 
 */
function addArtist(username, artist) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            if(selected.length == 0) throw new Error('There is no user ' + username)
            const user =  selected[0]
            user.artists.push(artist)
            return fs.writeFile(usersPath, JSON.stringify(arr, null, 4))
        })
}

/**
 * Removes artist name from the array of artists of the User with 
 * given username.
 * 
 * @param {String} username 
 * @param {Number} artistId Index of the artist in the array
 * @returns {Promise<Void>}
 */
function removeArtist(username, artistId) {
    return fs
        .readFile(usersPath)
        .then(buffer => {
            const arr = JSON.parse(buffer)
            const selected = arr.filter(user => user.username == username)
            if(selected.length == 0) throw UserError(404, 'There is no user ' + username)
            const user =  selected[0]
            if(artistId >= user.artists.length) throw UserError(404, 'There is no artist!')
            user.artists.splice(artistId, 1)
            return fs.writeFile(usersPath, JSON.stringify(arr, null, 4))
        })
}

function UserError(status, message) {
    const err = Error(message)
    err.status = status
    return err
}


function init(path) {
    if(path) usersPath = path
    return {
        getUser,
        getUsers,
        addArtist,
        removeArtist,
        addUser
    }
}

module.exports = { init }