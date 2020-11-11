'use strict'

const lastfm = require('./lastfm')
const users = require('./users')

/**
 * Returns an array with limit top tracks of each favourite artist
 * of the User with username.
 * 
 * @param {String} username 
 * @param {Number} limit 
 * @param {function(Error, Array)} cb 
 */
function getTopTracks(username, limit, cb) {
    users.getUser(username, (err, user) => {
        if(err) return cb(err)
        let artCount = user.artists.length
        let ret = []
        user.artists.forEach((artist) => {
            lastfm.getTopTracks(artist, (err, tracks) => {
                if(err) return cb(err)
                ret = ret.concat(tracks.slice(0, limit))
                if(--artCount <= 0) return cb(null, ret)
            })
        })
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

}

module.exports = {
    addArtist, getTopTracks
}