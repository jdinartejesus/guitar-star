module.exports.assert = {
  equal: function (value1, value2, message) {
    message = message || "Error aren't equal"

    if (value1 !== value2) {
      throw new Error(message)
    }
  }
}
