'use strict'

const urllib = require('urllib')

const LASTFM_HOST = 'http://ws.audioscrobbler.com/2.0/'
const LASTFM_KEY = '79b2506be8ce86d852882e1774f1f2e8'
const LASTFM_TOP_TRACKS = `${LASTFM_HOST}?method=artist.gettoptracks&api_key=${LASTFM_KEY}&format=json&artist=`

/**
 * @param {String} artist 
 * @param {function(Error, Array)} cb 
 */
function topTracks(artist, cb) {
    const path = LASTFM_TOP_TRACKS + artist
    urllib.request(path, (err, data, resp) => {
        if(err) 
            return cb(err)
        if(resp.statusCode != 200)
            return cb(new Error(resp.statusMessage))
        const body = JSON.parse(data) 
        if(body.error) 
            return cb(new Error(body.message))
        cb(null, body.toptracks.track)
    })
}

module.exports = {
    topTracks
}