const http = require('http')
const fs = require('fs')
const path = require('path')

http.createServer((req, res) => {
  fs.readFile(path.join(__dirname,req.url), (err, data) =>{
    console.log(req.url);
    if(err){
      res.writeHead(404, 'not found')
      res.end('Oh, not found')
    }else{
      //Expires   http1.0
      // let date = new Date(Date.now() + 1000*10).toGMTString()
      // res.setHeader('Expires', date)

      //pragma:  no-cache
      res.setHeader('pragma', 'no-cache')

      res.writeHead(200, 'ok')
      res.end(data)
    }
  })
}).listen(8080)

console.log('visit: http://localhost:8080')