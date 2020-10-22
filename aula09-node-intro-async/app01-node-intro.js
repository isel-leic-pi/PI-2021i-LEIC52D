const request = require('sync-request')

const res = request('GET', 'http://example.com')
console.log(res.getBody().toString())