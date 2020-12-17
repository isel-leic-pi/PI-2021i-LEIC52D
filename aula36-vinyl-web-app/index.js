'use strict'

let usersPath
if(process.argv.length > 2) {
    usersPath = process.argv[2]
}

require('./lib/server').init(usersPath)