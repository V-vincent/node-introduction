// 石头剪刀布小游戏
// 终端运行命令：node spr.js rock
// argv 可以获取到命令行 node 后面输入的行为
// let playerAction = process.argv[process.argv.length - 1]; // 最后面的输入
let playerAction = process.argv[2]; // 也可以通过下标直接获取
console.log('你出了', playerAction)
if (playerAction != 'rock' && playerAction != 'paper' && playerAction != 'scissor') {
  console.log('请输入rock或paper或scissor')
} else {
  // 电脑通过随机数生成石头剪刀布
  let computerAction;
  let random = Math.random() * 3;
  if (random < 1) {
    console.log('电脑出了石头')
    computerAction = 'rock'
  } else if (random > 2) {
    console.log('电脑出了剪刀')
    computerAction = 'scissor'
  } else {
    console.log('电脑出了布')
    computerAction = 'paper'
  }

  // 比较分出输赢
  if (computerAction === playerAction) {
    console.log('平局')
  } else if (
    (computerAction == 'rock' && playerAction == 'scissor') ||
    (computerAction == 'scissor' && playerAction == 'paper') ||
    (computerAction == 'paper' && playerAction == 'rock')
  ) {
    console.log('你输了')
  } else {
    console.log('你赢了')
  }
}