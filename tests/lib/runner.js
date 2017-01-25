module.exports = {
  test: function (message, fn) {
    try {
      fn()
    } catch (error) {
      throw new Error(error)
    }
  }
}
