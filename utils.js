module.exports.assert = {
  equal: function (condition1, condition2, message) {
    message = message || "Error aren't equal"

    if (condition1 !== condition2) {
      throw new Error(message)
    }
  }
}
