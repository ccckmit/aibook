var fs = require('fs'); // �ޥ��ɮת���
var kb = require('./kb');

var code = "A<=B. B<=C&D. C<=E. D<=F. E. F. Z<=C&D&G.";
var kb1 = new kb();
kb1.load(code);
kb1.forwardChaining();
// kb1.backwardChaining("A");
// kb1.backwardChaining("Z");

