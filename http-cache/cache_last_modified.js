const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url)
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, 'not found')
      res.end('Oh, not found')
    } else {
      //example 1
      // let stat = fs.statSync(filePath)
      // console.log(stat.mtime);
      // // res.setHeader('cache-control', 'no-cache')
      // // res.setHeader('Cache-Control', 'no-store')
      // let modifyDate = new Date(Date.parse(stat.mtime)).toGMTString()
      // res.setHeader('Last-Modified', modifyDate)
      //
      // res.writeHead(200, 'ok')
      // res.end(data)

      //example2
      let mtime = Date.parse(fs.statSync(filePath).mtime)
      res.setHeader('Cache-Control', 'no-cache')
      if(!req.headers['if-modified-since']) {
        res.setHeader('Last-Modified', new Date(mtime).toGMTString())
        res.writeHead(200, 'OK')
        res.end(data)
      }else {
        let oldMtime = Date.parse(req.headers['if-modified-since'])
        if(mtime > oldMtime) {
          res.setHeader('Last-Modified', new Date(mtime).toGMTString())
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