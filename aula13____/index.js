'use strict'

const vinyl = require('./lib/vinyl')

vinyl.getUserFavouritesTracks('gamboa', 5, (err, tracks) => {
    console.log(err || tracks)
})