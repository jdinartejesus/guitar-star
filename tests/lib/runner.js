module.exports = {
  isSetup: false,
  _setup () {
    this.isSetup = true
    this.tests = []

    process.nextTick(() => this._runTests())
  },

  test (msg, fn) {
    if (!this.isSetup) {
      this._setup()
    }

    this.tests.push({
      msg: msg,
      test: fn
    })
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

    let suite = this.tests.shift()

    try {
      if (suite.test.length) {
        suite.test(this._testComplete.bind(this, suite.msg))
      } else {
        suite.test()
        this._runNextTest()
      }
    } catch (err) {
      this._fail(err.message, suite.msg)
      this._runNextTest()
    }
  },

  _runTests () {
    this.errors = []
    this.total = this.tests.length
    this._runNextTest()
  },

  _fail (msg, suite) {
    this.errors.push({msg, suite})
  },

  _finishTests () {
    this.failures = this.errors.length
    this.success = this.total - this.failures

    this.errors.forEach((error) => {
      process.stdout.write(`\n ${error.suite}`)
      process.stdout.write(`\n Error: ${error.msg} \n`)
    })
    process.stdout.write(`\n ${this.failures} Failed ${this.success} Passed \n`)
  }
}
