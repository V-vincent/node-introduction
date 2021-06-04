// 终端运行命令：node index.js
// 加载模块
const http = require('http')
const fs = require('fs');

// 创建服务
http.createServer(function (request, response) {
  // console.log(request.url);
  // 如果是图标请求则直接返回 200
  if (request.url == '/favicon.ico') {
    response.writeHead(200);
    response.end()
    return
  }

  response.writeHead(200);
  // fs 是文件模块，通过 createReadStream 可以读取本地文件，这里读取的是目录下的 index.html 文件
  // 通过 pipe 写入响应对象
  fs.createReadStream(__dirname + '/index.html').pipe(response)
}).listen(3000)