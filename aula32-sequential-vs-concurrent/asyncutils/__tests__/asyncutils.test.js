'use strict'

const asyncutils = require('../index')

test('Test two tasks complete successfuly', done => {
    const task1 = cb => setTimeout(() => cb(null, 'one'), 200)
    const task2 = cb => setTimeout(() => cb(null, 'two'), 100)
    asyncutils.parallel([task1, task2], (err, arr) => {
        expect(err).toBeFalsy()
        expect(arr.length).toBe(2)
        expect(arr[0]).toBe('one')
        expect(arr[1]).toBe('two')
        done()
    })
})