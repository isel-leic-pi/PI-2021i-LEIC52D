const urllib = require('urllib')

const urls = ['http://example.com', 'https://dzone.com/', 'https://developer.android.com/']

function bodyLength(url) {
    urllib.request(url, (err, body) => {
        if(err) {
            console.log(err)
        } else {
            console.log('>>>>' + url + ' body size: ' + body.length)
        }
    })
}

urls
    .forEach(url => {
        console.log('Requesting ' + url)
        bodyLength(url)
    })