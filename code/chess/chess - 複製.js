// 五子棋遊戲，單機命令列版
//   人對人下：node chess P2P
//   人對電腦：node chess P2C
// 作者：陳鍾誠
var util = require("util");
var log = console.log;
var r = require('readline').createInterface(process.stdin, process.stdout);

// 印出訊息，並取得輸入。
var prompt = function(turn) {
  var msg = format('將 %s 下在 :    ', turn);
  r.setPrompt(msg);
  r.prompt();
}

var format = function() { // 字串格式化 
  return util.format.apply(null, arguments);
}

// 棋盤物件
var Board = function() {
  this.m = [];
  for (var r=0; r<16; r++) {
    this.m[r] = [];
    for (var c=0; c<16; c++)
      this.m[r][c] = '-';
  }
}

// 將棋盤格式化成字串
Board.prototype.toString = function() {
  var str = "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  for (var r=0; r<16; r++) {
    str += r.toString(16)+" "+this.m[r].join(" ")+" "+r.toString(16)+"\n";
  }
  str += "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  return str;
}

// 顯示棋盤
Board.prototype.show = function() {
  log(this.toString());
}

// 以下為遊戲相關資料與函數
// var zero = [ 0, 0, 0, 0, 0];
// var inc  = [-2,-1, 0, 1, 2];
// var dec  = [ 2, 1, 0,-1,-2];
var z9   = [ 0, 0, 0, 0, 0, 0, 0, 0, 0];
var i9   = [-4,-3,-2,-1, 0, 1, 2, 3, 4];
var d9   = [ 4, 3, 2, 1, 0,-1,-2,-3,-4];
var z5   = [ 0, 0, 0, 0, 0];
var i2   = i9.slice(2,-2);
var d2   = d9.slice(2,-2);

// 檢查在 (r, c) 這一格，規則樣式 (dr, dc) 是否被滿足
// dr, dc 的組合可用來代表「垂直 | , 水平 - , 下斜 \ , 上斜 /」。
var patternCheck=function(board, turn, r, c, dr, dc) {
  for (var i = 0; i < dr.length; i++) {
    var tr = Math.round(r+dr[i]);
    var tc = Math.round(c+dc[i]);
    if (tr<0 ||tr > 15 || tc<0 || tc>15)
      return false;
    var v = board.m[tr][tc];
    if (v != turn) return false;
  }
  return true;
}

// 檢查是否下 turn 這個子的人贏了。
var winCheck = function(board, turn) {
  var win = false;
  for (var r=0; r<16; r++) {
    for (var c=0; c<16; c++) {
      if (patternCheck(board, turn, r, c, z5, i2)) // 垂直 | ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, z5)) // 水平 - ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, i2)) // 下斜 \ ;
        win = true;
      if (patternCheck(board, turn, r, c, i2, d2)) // 上斜 / ;
        win = true;
    }
  }
  if (win) {
    log("%s 贏了！", turn);  // 如果贏了就印出贏了
    process.exit(0); // 然後離開。
  }
  return win;
}

var peopleTurn = function(board, turn, line) {
  var r = parseInt(line[0], 16); // 取得下子的列 r (row)
  var c = parseInt(line[1], 16); // 取得下子的行 c (column)
  if (r<0 || r>15 || c<0 || c>15) // 檢查是否超出範圍
    throw "(row, col) 超出範圍!"; // 若超出範圍就丟出例外，下一輪重新輸入。
  if (board.m[r][c] != '-') // 檢查該位置是否已被佔據
    throw format("(%s%s) 已經被佔領了!", line[0], line[1]); // 若被佔據就丟出例外，下一輪重新輸入。
  board.m[r][c] = turn; // 否則、將子下在使用者輸入的 (r,c) 位置
}

var P2P=function(b, turn, line) {
  peopleTurn(b, turn, line);
  b.show();         // 顯示棋盤現況
  winCheck(b, turn);
  return (turn == 'o')?'x':'o'; // 換對方下了。
}

var attackScore = [ 3, 10, 30, 100, 500 ];
var guardScore  = [ 2,  9, 25,  90, 400 ];
var attack=1, guard=2;

var getScore = function(board, r, c, turn, mode) {
  var score = 0;
  board.m[r][c] = turn;
  for (var start = 0; start <= 4; start++) {
    for (var len = 5; len >= 1; len--) {
      var end = start+len;
      var zero = z9.slice(start, start+len);
      var inc  = i9.slice(start, start+len);
      var dec  = d9.slice(start, start+len);
      if (patternCheck(board, turn, r, c, zero, inc)) // 攻擊：垂直 | ;
        score += len * len;
      if (patternCheck(board, turn, r, c, inc, zero)) // 攻擊：水平 - ;
        score += len * len;
      if (patternCheck(board, turn, r, c, inc, inc)) // 攻擊：下斜 \ ;
        score += len * len;
      if (patternCheck(board, turn, r, c, inc, dec)) // 攻擊：上斜 / ;
        score += len * len;
    }
  }
  board.m[r][c] = '-';  
  return score;
}

var computerTurn = function(board, turn) {
  var best = { r:0, c:0, score:-1 };
  for (var r=0; r<15; r++) {
    for (var c=0; c<15; c++) {
      if (board.m[r][c] !== '-') 
        continue;
      var attackScore = getScore(board, r, c, 'x', attack);  // 攻擊分數
      var guardScore  = getScore(board, r, c, 'o', guard);  // 防守分數
      var score = attackScore+guardScore;
      if (score > best.score) {
        best.r = r;
        best.c = c;
        best.score = score;
      }
    }
  }
  log("best=%j", best);
  board.m[best.r][best.c] = turn; // 否則、將子下在使用者輸入的 (r,c) 位置
}

var P2C=function(b, turn, line) {
  peopleTurn(b, 'o', line);
  b.show();         // 顯示棋盤現況
  winCheck(b, 'o'); // 檢查下了這子之後是否贏了！
  computerTurn(b, 'x', line);
  b.show();
  winCheck(b, 'x');
  return 'o';
}

var chess=function(doLine) {
  // 主程式開始
  var b = new Board(); // 建立棋盤
  b.show();            // 顯示棋盤
  var turn = 'o';      // o 先下
  prompt(turn);        // 提示要求下子訊息，並接受輸入。
  r.on('line', function(line) { // 每當讀到一個字串時。
    try {
      turn = doLine(b, turn, line);
    } catch (err) { // 若有丟出例外
      log(err); // 則印出錯誤訊息。
    }
    prompt(turn); // 提示要求下子訊息，並接受輸入。
  }).on('close', function() { // 輸入結束了
    process.exit(0); // 程式結束。
  });
}

if (process.argv[2] === "P2P") // 人對人下
  chess(P2P);
else if (process.argv[2] === "P2C") // 人對電腦下
  chess(P2C);
else { // 命令下錯，提示訊息！
  log("人對人下：node chess P2P\n人對電腦：node chess P2C");
  process.exit(0);
}
