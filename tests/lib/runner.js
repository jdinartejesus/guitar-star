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

    this.tests.push(fn)
  },

  _testComplete (err) {
    if (err) {
      this._fail(err.message)
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
      if (test.length) {
        test(this._testComplete.bind(this))
      } else {
        test()
        this._runNextTest()
      }
    } catch (err) {
      this._fail(err.message)
      this._runNextTest()
    }
  },

  _runTests () {
    this.errors = []
    this.total = this.tests.length
    this._runNextTest()
  },

  _fail (msg) {
    this.errors.push({msg})
  },

  _finishTests () {
    this.failures = this.errors.length
    this.success = this.total - this.failures

    this.errors.forEach((error) => (process.stdout.write(`${error.msg} \n`)))
    process.stdout.write(`${this.failures} Failed ${this.success} Passed \n`)
  }
}
