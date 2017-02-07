module.exports = {
  isSetup: false,
  _setup () {
    this.isSetup = true
    this.tests = []
    this.errors = []

    process.nextTick(() => {

      this._runTest()

    })
  },

  test (msg, fn) {
    if (!this.isSetup) {
      this._setup()
    }

    this.tests.push(fn)
  },

  _testComplete () {
    if (arguments) {
      this.errors.push(arguments)
    }

    this._runNextTest()
  },

  _runNextTest () {
    if (this.tests.length === 0) {
      this._finishTests()
      return
    }

    var test = this.tests.shift() 
    if (!test.length) {
      try { 
        test()
      } catch (err) {
        this._fail(0, err.message)
      }
      this._runNextTest()
    } else {
      try { 
        test(this._testComplete.bind(this))
      } catch (err) {
        this._fail(0, err.message)
      }
    }
  },

  _runTest () {
    this.total = this.tests.length
    this._runNextTest()
  },

  _fail (index, msg) {
    this.errors.push({id: index, msg: msg})
  },

  _finishTests () {
    this.failures = this.errors.length
    this.success =  this.total - this.failures

    this.errors.forEach((error) => (process.stdout.write(`${error.msg} \n`)))
    process.stdout.write(`${this.failures} Failed ${this.success} Passed \n`)
  }
}
