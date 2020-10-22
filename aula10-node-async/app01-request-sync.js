const request = require('sync-request')

const urls = ['http://example.com', 'https://dzone.com/', 'https://developer.android.com/']

function bodyLength(url) {
    const res = request('GET', url)
    const body = res.getBody().toString()
    console.log('>>>>' + url + ' body size: ' + body.length)
}

urls
    .forEach(url => {
        console.log('Requesting ' + url)
        bodyLength(url)
    })