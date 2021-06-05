// koa 框架改造
const fs = require('fs');
const koa = require('koa');
const mount = require('koa-mount');

const game = require('./game');
let playerWon = 0; // 赢的次数

const app = new koa();
// 精简内核，所有额外功能都移到中间件里实现。路由使用通过 mount 的中间件实现的
// 通过 mount() 把中间件挂载到一个特定的路径上，中间件独立于这个路径动作。 
// /favicon.ico 路径的路由
app.use(
  mount('/favicon.ico', function (ctx) {
    // 对 `request` 和 `response` 的处理简化了，这两者都挂载在 `ctx` 上使用，返回的内容也可以通过直接赋值来使用
    ctx.status = 200;
    return;
  })
)
// mount中不可以跟多个函数中间件，可以通过 new koa() 来挂载在 koa 上：
const gameKoa = new koa();
app.use(
  mount('/game', gameKoa)
)
// 分离模块
gameKoa.use(
  async function (ctx, next) {
    if (playerWon >= 3) {
      // response.status(500);
      // response.send('我不会再玩了！');
      // 使用 = 赋值，更加简化了
      ctx.status = 500;
      ctx.body = '我不会再玩了！';
      return;
    }
    // 通过next执行后续中间件
    await next();
    // 当后续中间件执行完之后，会执行到这个位置
    if (ctx.playerWon) {
      playerWon++;
    }
  }
)
// 在 koa 里可以使用 async function 和 await next() 来执行异步中间件
// 使在异步的情况下也符合洋葱模型。
gameKoa.use(
  async function (ctx, next) {
    const query = ctx.query;
    const playerAction = query.action;
    if (!playerAction) {
      ctx.status = 400;
      return;
    }
    ctx.playerAction = playerAction;
    await next();
  }
)
// 异步处理，500ms后才返回结果
gameKoa.use(
  async function (ctx, next) {
    const playerAction = ctx.playerAction;
    const result = game(playerAction);
    // 对于一定需要在请求主流程里完成的操作，一定要使用await进行等待
    // 否则koa就会在当前事件循环就把http response返回出去了
    await new Promise(resolve => {
      setTimeout(() => {
        ctx.status = 200;
        if (result == 0) {
          ctx.body = '平局'
        } else if (result == -1) {
          ctx.body = '你输了'
        } else {
          ctx.body = '你赢了'
          ctx.playerWon = true;
        }
        resolve();
      }, 500)
    })
  }
)
// 打开页面 index.html
app.use(
  mount('/', function (ctx) {
    ctx.body = fs.readFileSync(__dirname + '/index.html', 'utf-8')
    return;
  })
)
// 监听端口 3000
app.listen(3000);