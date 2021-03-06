let http = require('http')
let Provoj = require('provoj')
let assert = Provoj.assert
let runner = Provoj.runner
const BASE_URL = 'http://localhost:8080'

runner.test('/ok api should return 200 status code', (done) => {
  http.get(`${BASE_URL}/ok`, (res) => {
    assert.equal(res.statusCode, 200, 'Status should be equal to 200', done)
    done()
  }).on('error', (err) => {
    done(err)
  })
})

runner.test('/error api should return 500 status code', (done) => {
  http.get(`${BASE_URL}/error`, (res) => {
    assert.equal(res.statusCode, 500, 'Status should be equal to 500', done)
    done()
  }).on('error', (err) => {
    done(err)
  })
})

runner.test('/foobar api should return 404 status code', (done) => {
  http.get(`${BASE_URL}/foobar`, (res) => {
    assert.equal(res.statusCode, 404, 'Status should be equal to 404', done)
    done()
  }).on('error', (err) => {
    done(err)
  })
})
