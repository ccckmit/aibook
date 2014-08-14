var Matrix   = require("./matrix");
var Solution = require("./solution");         // �ޤJ��H���ѵ����O

// A X = B �A�D X �O�h�֡H  
// A=[[1,1],[1,-1]] B=[[5][1]]�A�]�N�O�D�G
//   x1+x2=5
//   x1-x2=1
// ���ѵ�

var A = new Matrix([[1,1],[1,-1]]);
var B = new Matrix([[5,1]]).transpose();

var log = console.log;

Solution.zero = function() {
  return new Solution(Matrix.create(2,1,0));
}

Solution.prototype.neighbor = function() {    // �h�ܼƸѵ����F�~��ơC
  var nx = new Matrix(this.v.m);              // �ƻs�ثe�Ѫ��x�}
  var i = Math.floor(Math.random()*nx.rows());// �H������@���ܼ�
  if (Math.random() > 0.5)                    // �Y��l�M�w�n�����Ω��k��
    nx.m[i][0] += this.step;
  else
    nx.m[i][0] -= this.step;
  return new Solution(nx);                    // �Ǧ^�s�ت��F�~�ѵ��C
}

Solution.prototype.energy = function() {      // ��q���:�p�� ||AX-B||�A�]�N�O ||Y-B||
  var X = this.v;
  var Y = A.mul(X);
  return Y.sub(B).norm();
}

Solution.prototype.toString = function() {    // �N�ѵ��ର�r�ꪺ��ơA�H�ѦC�L�ΡC
  return "energy("+this.v.transpose().toString().replace("\n", "")+")="+this.energy().toFixed(3);
}

module.exports = Solution;                    // �N�ѵ����O�ץX�C
