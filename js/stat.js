'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP_Y = 10;
var GAP_X = 50;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var BAR_HEIGHT_MAX = -150;
var introText = ['Ура вы победили!', 'Список результатов:'];

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var fillIntro = function (ctx, text, color) {
  ctx.fillStyle = color;
  for (var i = 0; i < text.length; i++) {
    var stringWidth = ctx.measureText(text[i]);
    ctx.fillText(text[i], CLOUD_X + (CLOUD_WIDTH / 2) - (stringWidth.width / 2), CLOUD_Y + FONT_GAP + GAP_Y + (GAP_Y + FONT_GAP) * i + 1);
  }
};

var getRoundTimes = function (arr) {
  var roundArray = [];
  for (var i = 0; i < arr.length; i++) {
    var number = parseInt(arr[i], 10);
    var roundNumber = Math.round(number);
    roundArray.push(roundNumber);
  }
  return roundArray;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInteger = function (min, max) {
  var random = min + Math.random() * (max + 1 - min);
  random = Math.floor(random);
  return random;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP_Y, CLOUD_Y + GAP_Y, 'rgba(0, 0, 0, 0.3)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px' + 'PT Mono';
  fillIntro(ctx, introText, '#000');

  var playerTimes = getRoundTimes(times);

  var maxTime = getMaxElement(playerTimes);

  if (players.length > times.length) {
    players.length = times.length;
  } else {
    times.length = players.length;
  }

  for (var i = 0; i < players.length; i++) {
    var barHeight = BAR_HEIGHT_MAX * playerTimes[i] / maxTime;
    var blue = getRandomInteger(20, 100);
    ctx.fillStyle = 'hsl(240,' + blue + '%, 50%)';
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba( 255, 0, 0, 1)';
    }
    ctx.fillRect(CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, CLOUD_Y + CLOUD_HEIGHT - 2 * GAP_Y - FONT_GAP, BAR_WIDTH, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, CLOUD_Y + CLOUD_HEIGHT - GAP_Y);
    ctx.fillText(playerTimes[i].toString(), CLOUD_X + GAP_X + (BAR_WIDTH + GAP_X) * i, CLOUD_HEIGHT + barHeight - FONT_GAP - 2 * GAP_Y);
  }
};
