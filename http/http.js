// 终端运行命令：node http.js
// http 是 Node 自带的包，在这里加载引入
const http = require('http')

// 通过 http.createServer 创建一个 Web 静态服务器
http.createServer(function (request, response) {
  // 监听到请求之后所做的操作
  // request 对象包含：用户请求报文的所有内容
  // 我们可以通过request对象，获取用户提交过来的数据

  // response 响应对象,用来响应一些数据
  // 当服务器想要向客户端响应数据的时候，就必须使用response对象
  response.writeHead(200);
  response.end('hello world');
}).listen(4000, function () {
  // 通过 listen 监听端口，开启服务
  console.log("服务器已经启动，可通过以下地址：http://localhost:4000");
})