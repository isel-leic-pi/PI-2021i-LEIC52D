'use strict'

const lastfm = require('./lastfm')
const users = require('./users').init()

/**
 * Retrieves the top tracks (limit) of the favourite artists
 * for the given username.
 * Notice it returns a single Array flatten with those tracks.
 * @param {String} username 
 * @returns {Promise<Array<Track>>}
 */
function getTopTracks(username, limit) {
    return users
        .getUser(username)                                                   // Promise<User>
        .then(user => user.artists)                                          // Promise<Array<Artist>
        .then(artists => artists.map(artist => lastfm.getTopTracks(artist))) // Promise<Array<Promise<Array<String>>>>
        .then(arr => Promise.all(arr))                                       // Promise<Array<Array<String>>>
        .then(tracks => tracks.map(arr => arr.slice(0, limit)))              // Promise<Array<Array<String>>>
        .then(tracks => tracks.flat())                                       // Promise<Array<String>>>
}

/**
 * Adds a new artist name to the array of artists of the User with 
 * given username.
 * Returns an Error both if there is not that username or there is no Artists with that name.
 * 
 * @param {*} username 
 * @param {*} artist 
 */
function addArtist(username, artist) {
    const task1 = users.getUser(username)
    const task2 = lastfm.searchArtist(artist)
    return Promise
        .all([task1, task2])
        .then(([user, arr]) => {
            if(arr.length == 0) throw Error('There is no artist with name ' + artist)
            return users.addArtist(user.username, arr[0].name)
        })
}

module.exports = {
    getTopTracks,
    addArtist
}