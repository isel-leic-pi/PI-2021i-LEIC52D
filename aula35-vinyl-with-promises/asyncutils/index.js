'use strict'

/**
 * @param {Array} tasks Each function has a single callback argument
 * @param {Error, Array} callback 
 */
function parallel(tasks, cb) {
    let failed, count = 0
    const res = []
    tasks.forEach((t, index) => t((err, val) => {
        if(failed) return
        if(err) return cb(failed = err)
        res[index] = val
        count++
        if(count >= tasks.length)
            cb(null, res)
    }))
}

module.exports = { parallel }