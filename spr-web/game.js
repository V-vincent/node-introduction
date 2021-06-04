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
  } else if (random > 2) {
    computerAction = 'scissor'
  } else {
    computerAction = 'paper'
  }

  // 比较分出输赢
  if (computerAction === playerAction) {
    return 0;
  } else if (
    (computerAction == 'rock' && playerAction == 'scissor') ||
    (computerAction == 'scissor' && playerAction == 'paper') ||
    (computerAction == 'paper' && playerAction == 'rock')
  ) {
    return -1;
  } else {
    return 1;
  }
}