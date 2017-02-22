module.exports = {
  isSetup: false,
  _setup () {
    this.isSetup = true
    this.tests = []

    process.nextTick(this._runTests.bind(this))
  },

  test (msg, fn) {
    if (!this.isSetup) {
      this._setup()
    }

    this.tests.push({msg, fn})
  },

  _testComplete (msg, err) {
    if (err) {
      this._fail(err.message, msg)
    }

    this._runNextTest()
  },

  _runNextTest () {
    if (this.tests.length === 0) {
      this._finishTests()
      return
    }

    let test = this.tests.shift()

    try {
      if (test.fn.length) {
        test.fn(this._testComplete.bind(this, test.msg))
      } else {
        test.fn()
        this._runNextTest()
      }
    } catch (err) {
      this._fail(err.message, test.msg)
      this._runNextTest()
    }
  },

  _runTests () {
    this.errors = []
    this.total = this.tests.length
    this._runNextTest()
  },

  _fail (err, msg) {
    this.errors.push({err, msg})
  },

  _finishTests () {
    this.failures = this.errors.length
    this.success = this.total - this.failures

    this.errors.forEach((error) => {
      process.stdout.write(`\n ${error.msg} [Fail]`)
      process.stdout.write(`\n ${error.err} \n`)
    })

    process.stdout.write(`\n ${this.success} passed, ${this.failures} falied, total ${this.total} \n`)
  }
}
