const http = require('http')
const { assert } = require('./utils')

http.get('/', (res) => {
  assert.equal(res.statusCode, 200, 'Status should be equal to 200')
})
