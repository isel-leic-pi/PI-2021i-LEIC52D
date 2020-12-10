'use strict'

const lastfm = require('./lastfm')
const users = require('./users').init()

/**
 * Retrieves the top tracks (limit) of the favourite artists
 * for the given username.
 * Notice it returns a single Array flatten with thos tracks.
 * @param {String} username 
 * @param {function(Error, Array)} cb 
 */
function getTopTracks(username, limit, cb) {
    users.getUser(username, (err, user) => {
        if(err) return cb(err)
        const arr = []
        let count = 0
        user.artists.forEach(artist => 
            lastfm.getTopTracks(artist, (err, tracks) => {
                if(err) return cb(err)
                count++
                tracks
                    .slice(0, limit)
                    .forEach(t => arr.push(t))
                if(count == user.artists.length)
                    cb(null, arr)
            })
        )
    })
}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * Returns an Error both if there is not that username or there is no Artists with that name.
 * 
 * @param {*} username 
 * @param {*} artist 
 * @param {*} cb 
 */
function addArtist(username, artist, cb) {
    const task1 = cb => users.getUser(username, cb)
    const task2 = cb => lastfm.searchArtist(artist, cb)
    let failed
    let user, arr
    task1((err, u) => {
        if(failed) return
        if(err) return insertArtisInUser(failed = err)
        user = u
        if (arr) insertArtisInUser(null, u, arr)
    })
    task2((err, a) => {
        if(failed) return
        if(err) return insertArtisInUser(failed = err)
        arr = a
        if (user) insertArtisInUser(null, user, a)
    })
    const insertArtisInUser = (err, user, arr) => {
        if(err) return cb(err)
        if(arr.length == 0) return cb(Error('There is no artist with name ' + artist))
        users.addArtist(username, arr[0].name, cb)
    } 

}

module.exports = {
    getTopTracks,
    addArtist
}