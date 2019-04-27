const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
    if (err) {
      res.writeHead(404, 'not found')
      res.end('Oh, not found')
    } else {
      // res.setHeader('cache-control', 'max-age=10')

      // res.setHeader('cache-control', 'no-cache')

      res.setHeader('cache-control', 'no-store')

      res.writeHead(200, 'ok')
      res.end(data)
    }
  })
}).listen(8080)

console.log('visit: http://localhost:8080')