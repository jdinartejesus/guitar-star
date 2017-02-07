let http = require('http')
let assert = require('./lib/assert')
let runner = require('./lib/runner')
const BASE_URL = 'http://localhost:8080'

runner.test('base api should return 200 status code', (done) => {
  http.get(BASE_URL, (res) => {
    assert.equal(res.statusCode, 200, 'Status should be equal to 200')
    done()
  }).on('error', (err) => {
    done(err)
  })
})

runner.test('base api should return 200 status code', () => {
  console.log('Done A')
  assert.equal(200, 300, 'Should be true')
})

runner.test('base api should return 200 status code', (done) => {
  setTimeout(() => {
    console.log('Done B')
    done()
  }, 200)
})
