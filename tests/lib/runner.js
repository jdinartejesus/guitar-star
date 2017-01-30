module.exports = {
  isSetup: false,
  setup () {
    this.isSetup = true
    this.tests = []
    this.errors = []

    process.nextTick(() => {
      this.run()
      this.end()
    })
  },

  test (message, fn) {
    if (!this.isSetup) {
      this.setup()
    }

    this.tests.push(fn)
  },

  run () {
    this.tests.forEach((test) => {
      try {
        test()
      } catch (err) {
        this.errors.push(err.message)
      }
    })
  },

  end () {
    this.failures = this.errors.length
    this.success = this.tests.length - this.failures

    this.errors.forEach((error) => (process.stdout.write(`${error}\n`)))
    process.stdout.write(`${this.failures} Failed ${this.success} Passed\n`)
  }
}
