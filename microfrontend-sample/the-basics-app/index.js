const http = require('http')
const fs = require('fs')
const path = require('path')

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.wav': 'audio/wav',
  '.mp4': 'video/mp4',
  '.woff': 'application/font-woff',
  '.ttf': 'application/font-ttf',
  '.eot': 'application/vnd.ms-fontobject',
  '.otf': 'application/font-otf',
  '.svg': 'application/image/svg+xml'
}

http.createServer((req, res) => {
  let filePath = '.' + req.url
  if (filePath === './' || filePath === './thebasicsapp') {
    filePath = './index.html'
  } else {
    filePath = filePath.replace(/\/thebasicsapp/i, '')
  }

  const extname = String(path.extname(filePath)).toLowerCase()

  const contentType = MIME_TYPES[extname] || 'application/octet-stream'

  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.log(filePath)
      res.writeHead(500)
      res.end(`[${error.code}] INTERNAL SERVER ERROR`)
    } else {
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
}).listen(3004)

console.log(`🌜 the basics app rodando em
>> http://127.0.0.1:3004/`)
