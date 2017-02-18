module.exports = {
  assert (value, msg) {
    if (!value) {
      throw new Error(msg || `AssertionError: when evaluation ${value}`)
    }
  },

  equal (value1, value2, msg) {
    msg = msg || `AssertionError: expected ${value1} to equal ${value2}`
    this.assert(value1 === value2, msg)
  }
}
