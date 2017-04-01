const http = require('http')

const server = http.createServer((request, response) => {
  console.log(request.url)

  switch (request.url) {
    case '/ok':
      response.writeHead(200, 'Success!')
      break
    case '/error':
      response.writeHead(500, 'Ups!')
      break
    default:
      response.writeHead(404, 'Not Found')
      break
  }
  response.end()
})

server.listen(8080)
