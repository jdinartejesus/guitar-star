const http = require('http')

http.get('/', (res) => {
  if (res.statusCode === 200) {
    console.log('Success')
  } else {
    console.log('Error', res.statusCode)
  }
})
