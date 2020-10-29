'use strict'

const lastfm = require('./lastfm')
const users = require('./users')

/**
 * @param {String} username 
 * @param {function(Error, Array)} cb 
 */
function getUserFavouritesTracks(username, limit, cb) {
    users.getUser(username, (err, user) => {
        if(err) return cb(err)
        else {
            const res = []
            const max = user.artists.length * 5
            user.artists.forEach(art => {
                lastfm.topTracks(art, (err, tracks) => {
                    if(err) return cb(err)
                    tracks
                        .map(t => t.name).slice(0, limit)
                        .forEach(t => res.push(t))
                    if(res.length == max)
                        cb(null, res)
                })
            })
        }
    })    
}

module.exports = {
    getUserFavouritesTracks
}