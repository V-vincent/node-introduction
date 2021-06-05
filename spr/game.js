// 石头剪刀布小游戏模块封装
// game.js
module.exports = function (playerAction) {
  if (['rock', 'scissor', 'paper'].indexOf(playerAction) == -1) {
    throw new Error('请输入rock或paper或scissor');
  }
  // 电脑通过随机数生成石头剪刀布
  var computerAction;
  var random = Math.random() * 3
  if (random < 1) {
    computerAction = 'rock'
    console.log('电脑出了石头')
  } else if (random > 2) {
    computerAction = 'scissor'
    console.log('电脑出了剪刀')
  } else {
    computerAction = 'paper'
    console.log('电脑出了布')
  }

  // 比较分出输赢
  if (computerAction === playerAction) {
    console.log('平局')
    return 0;
  } else if (
    (computerAction == 'rock' && playerAction == 'scissor') ||
    (computerAction == 'scissor' && playerAction == 'paper') ||
    (computerAction == 'paper' && playerAction == 'rock')
  ) {
    console.log('你输了')
    return -1;
  } else {
    console.log('你赢了')
    return 1;
  }
}