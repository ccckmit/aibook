var util = require("util");
var r = require('readline').createInterface(process.stdin, process.stdout);
var log = console.log;
var format = function() {
  return util.format.apply(null, arguments);
}

var Board = function() {
  this.turn = 'o';
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

Board.prototype.prompt = function() {
  var msg = format('put %s at : ', this.turn);
  r.setPrompt(msg);
  r.prompt();
}

var b = new Board();

b.show();
b.prompt();
r.on('line', function(line) {
  try {
    var r = parseInt(line[0], 16);
    var c = parseInt(line[1], 16);
    if (r<0 || r>15 || c<0 || c>15) throw "(row, col) out of range!";
    if (b.m[r][c] != '-')
      throw format("(%s%s) is occupied!", line[0], line[1]);
    b.m[r][c] = b.turn;
    b.show();
    b.turn = (b.turn == 'o')?'x':'o';
  } catch (err) {
    log(err);
  }
  b.prompt();
}).on('close', function() {
  process.exit(0);
});
