const fs = require('fs');
const express = require('express');

const game = require('./game');
let playerWon = 0; // 赢的次数

const app = express();

// 路由功能，将对应路由功能分开作为模块处理，到时候也可以放到其它文件去
// 通过 app.get 设定 /favicon.ico 路径的路由
// .get 代表请求 method 是 get，所以这里可以用 post、delete 等。这个能力很适合用于创建 rest 服务
app.get('/favicon.ico', function (request, response) {
  // 一句 status(200) 代替 writeHead(200); end();
  // response.writeHead(200);
  // response.end();
  response.status(200);
  return;
})
// 打开页面 index.html
app.get('/', function (request, response) {
  // fs.createReadStream(__dirname + '/index.html').pipe(response);
  // send接口会判断你传入的值的类型，文本的话则会处理为text/html
  // Buffer的话则会处理为下载，html文件需要加上 `utf-8`
  response.send(fs.readFileSync(__dirname + '/index.html', 'utf-8'))
})

// next()同步状态下没有问题的，但是一旦有了异步，洋葱模型就打破了
app.get('/game',
  function (request, response, next) {
    if (playerWon >= 3) {
      response.status(500);
      response.send('我不会再玩了！');
      return;
    }
    // 通过next执行后续中间件
    next();
    // 当后续中间件执行完之后，会执行到这个位置
    if (response.playerWon) {
      playerWon++;
    }
  },
  // 获取玩家的操作
  function (request, response, next) {
    // Express 中对 request 做了一些处理，可以直接拿到 query 参数
    // const query = querystring.parse(parsedUrl.query);
    // const playerAction = query.action;
    const query = request.query;
    const playerAction = query.action;
    response.playerAction = playerAction;
    // 通过next执行后续中间件
    next();
  },
  function (request, response) {
    // 通过 response 去挂载一些参数
    let playerAction = response.playerAction;
    // 执行游戏逻辑
    const gameRes = game(playerAction);
    // 先返回头部
    // response.writeHead(200);
    response.status(200);
    // 根据不同的游戏结果返回不同的说明
    if (gameRes == 0) {
      response.send('平局！');
    } else if (gameRes == 1) {
      response.send('你赢了！');
      // 玩家胜利次数统计+1
      // playerWon++;
      response.playerWon = true;
    } else {
      response.send('你输了！');
    }
  }
)
app.listen(3000);