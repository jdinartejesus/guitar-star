const http = require('http')
const fs = require('fs')
var qs = require('querystring')

const server = http.createServer((request, response) => {
  switch (request.url) {
    case '/users':
      return getUsers((data) => {
        response.writeHead(200, 'Success')
        response.write(data)
        response.end()
      })
    case '/user':
      let body = []
      request.on('data', (chunk) => (body.push(chunk)))
      request.on('end', () => {
        body = Buffer.concat(body).toString()
        const res = qs.parse(body)
        addUser(res, () => {
          response.end()
        })
      })
      break
    default:
      response.writeHead(404, 'Not Found')
      break
  }
})

function getUsers (cb) {
  fs.readFile('src/db/users.txt', (err, data) => {
    if (err) throw err

    return cb(data)
  })
}

function addUser (res, cb) {
  fs.appendFile('src/db/users.txt', `${res.user}\n`, (err) => {
    if (err) throw err

    return cb()
  })
}

server.listen(8080)

