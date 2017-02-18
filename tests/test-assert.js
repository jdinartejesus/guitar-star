let assert = require('./lib/assert')
let runner = require('./lib/runner')

runner.test('assert(true) should not fail', () => {
  assert(true)
})

runner.test('assert.equal(true, true) should not fail', () => {
  assert.equal(true, true)
})
