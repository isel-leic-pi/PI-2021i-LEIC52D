'use strict'

const express = require('express')
const routes = require('./routes/routes-vinyl')

if(process.argv.length > 2) {
    require('./repo/users').init(process.argv[2])
}

const app = express()

app.use(routes)
app.use((err, req, resp, next) => {
    resp.status(err.status)
    resp.json(err)
})
app.listen(8000, () => console.log('Listening for HTTP requests on port 8000'))