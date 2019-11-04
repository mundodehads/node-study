const http = require('http')
const fs = require('fs')


http.createServer((req, res) => {
  fs.readFile('./index.html', (err, content) => {
    if (err) {
      res.writeHead(500)
      res.end(`[${err.code}] INTERNAL SERVER ERROR`)
      res.end()
    }

    res.writeHead(200, { 'Content-Type': 'text/html', 'req-headers': JSON.stringify(req.headers) })
    res.end(content, 'utf-8')
  })
}).listen(3001)

console.log(`🌝 olamundo rodando em
>> http://127.0.0.1:3001/`)
