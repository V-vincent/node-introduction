const http = require('http');
const fs = require('fs');
const url = require('url'); // 加载内置模块url，实现转换发送到该http服务上的http请求包的url
const querystring = require('querystring'); // 模块 querystring 可以对http请求所带的数据进行解析

const game = require('./game');
let playerWon = 0; // 赢的次数

http.createServer(function (request, response) {
  // 将其分割成 协议(protocol)://域名(host):端口(port)/路径名(pathname)?请求参数(query)
  const parsedUrl = url.parse(request.url);
  // 浏览器所有对这个服务器的请求，都会走到这个http.createServer的回调函数里
  // 所以这里对不同的请求url做判断，就可以处理不同url的请求的返回
  // 如果请求url是浏览器icon，比如 http://localhost:3000/favicon.ico的情况
  // 就返回一个200就好了
  if (parsedUrl.pathname == '/favicon.ico') {
    response.writeHead(200);
    response.end();
    return;
  }
  // 如果访问的是根路径，则把游戏页面读出来返回出去
  if (parsedUrl.pathname == '/') {
    fs.createReadStream(__dirname + '/index.html').pipe(response);
  }
  if (parsedUrl.pathname == '/game') {
    // 如果请求url是游戏请求，比如 http://localhost:3000/game?action=rock的情况
    // 就要把action解析出来，然后执行游戏逻辑
    const query = querystring.parse(parsedUrl.query);
    const playerAction = query.action;
    // 如果统计的玩家胜利次数超过3
    if (playerWon >= 3) {
      response.writeHead(500);
      response.end('我再也不和你玩了！');
      return
    }

    // 执行游戏逻辑
    const gameRes = game(playerAction);
    // 先返回头部
    response.writeHead(200);
    // 根据不同的游戏结果返回不同的说明
    if (gameRes == 0) {
      response.end('平局！');
    } else if (gameRes == 1) {
      response.end('你赢了！');
      playerWon++; // 玩家胜利次数统计+1
    } else {
      response.end('你输了！');
    }
  }
}).listen(3000)