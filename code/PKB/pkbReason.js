var fs = require('fs'); // �ޥ��ɮת���
var kb = require('./pkb');

var kb1 = new kb();
var code = fs.readFileSync(process.argv[2], "utf8").replace(/\n/gi, ""); // Ū���ɮ�
kb1.load(code);
kb1.forwardChaining();
