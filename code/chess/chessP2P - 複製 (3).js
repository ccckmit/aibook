var util = require("util");
var r = require('readline').createInterface(process.stdin, process.stdout);
var log = console.log;

var format = function() {
  return util.format.apply(null, arguments);
}

var Board = function() {
  this.m = [];
  for (var r=0; r<16; r++) {
    this.m[r] = [];
    for (var c=0; c<16; c++)
      this.m[r][c] = '-';
  }
}

Board.prototype.toString = function() {
  var str = "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  for (var r=0; r<16; r++) {
    str += r.toString(16)+" "+this.m[r].join(" ")+" "+r.toString(16)+"\n";
  }
  str += "  0 1 2 3 4 5 6 7 8 9 a b c d e f\n";
  return str;
}

Board.prototype.show = function() {
  log(this.toString());
}

var zero = [ 0, 0, 0, 0, 0];
var inc  = [-2,-1, 0, 1, 2];
var dec  = [ 2, 1, 0,-1,-2];

Board.prototype.patternCheck=function(turn, r, c, dr, dc) {
  for (var i = 0; i < dr.length; i++) {
	  var tr = Math.round(r+dr[i]);
		var tc = Math.round(c+dc[i]);
		if (tr<0 ||tr > 15 || tc<0 || tc>15)
		  return false;
    var v = this.m[tr][tc];
    if (v != turn) return false;
  }
  return true;
}

Board.prototype.winCheck = function(turn) {
  for (var r=0; r<16; r++) {
    for (var c=0; c<16; c++) {
      if (this.patternCheck(turn, r, c, zero, inc)) // 垂直 | ;
        return true;
      if (this.patternCheck(turn, r, c, inc, zero)) // 水平 - ;
        return true;
			if (this.patternCheck(turn, r, c, inc, inc)) // 上斜 / ;
			  return true;
      if (this.patternCheck(turn, r, c, inc, dec)) // 下斜 \ ;
			  return true;
    }
  }
	return false;
}

var prompt = function(turn) {
  var msg = format('put %s at : ', turn);
  r.setPrompt(msg);
  r.prompt();
}

var b = new Board();
var turn = 'o';
b.show();
prompt(turn);
r.on('line', function(line) {
  try {
    var r = parseInt(line[0], 16);
    var c = parseInt(line[1], 16);
    if (r<0 || r>15 || c<0 || c>15) throw "(row, col) out of range!";
    if (b.m[r][c] != '-')
      throw format("(%s%s) is occupied!", line[0], line[1]);
    b.m[r][c] = turn;
    b.show();

		if (b.winCheck(turn)) {
		  log("%s 贏了！", turn); 
			process.exit(0);		
		}
		
    turn = (turn == 'o')?'x':'o';
  } catch (err) {
    log(err);
  }
  prompt(turn);
}).on('close', function() {
  process.exit(0);
});
