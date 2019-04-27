const http = require('http')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname, req.url), (err, data) => {
    if (err) {
      res.writeHead(404, 'not found')
      res.end('Oh, not found')
    } else {
      // example1
      // let md5 = crypto.createHash('md5')
      // res.setHeader('Cache-Control', 'no-cache')
      // res.setHeader('Etag', md5.update(data).digest('base64'))
      // res.writeHead(200, 'ok')
      // res.end(data)

      // example2
      let oldEtag = req.headers['if-none-match']
      if(!oldEtag) {
        let md5 = crypto.createHash('md5')
        res.setHeader('Etag', md5.update(data).digest('base64'))
        res.writeHead(200, 'OK')
        res.end(data)
      } else {
        let newEtag = crypto.createHash('md5').update(data).digest('base64')
        if(oldEtag !== newEtag) {
          res.setHeader('Etag', newEtag)
          res.writeHead(200, 'OK')
          res.end(data)
        }else {
          res.writeHead(304)
          res.end()
        }
      }
    }
  })
}).listen(8080)

console.log('visit: http://localhost:8080')