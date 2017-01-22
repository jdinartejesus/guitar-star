const http = require('http')
const { assert } = require('./utils')
const BASE_URL = 'http://localhost:8080'

http.get(BASE_URL, (res) => {
  assert.equal(res.statusCode, 200, 'Status should be equal to 200')
})
