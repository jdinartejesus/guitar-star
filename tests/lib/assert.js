function assert(value, msg) {
  if (!value) {
    throw new Error(msg || `AssertionError: when evaluation ${value}`)
  }
}

assert.equal = function (value1, value2, msg) {
  msg = msg || `AssertionError: expected ${value1} to equal ${value2}`
  assert(value1 === value2, msg)
}

module.exports = assert
