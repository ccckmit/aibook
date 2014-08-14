var Solution = require("./solution");         // �ޤJ��H���ѵ����O

Solution.prototype.neighbor = function() {    // ���ܼƸѵ����F�~��ơC
  var x = this.v, dx=this.step;               // x:�ѵ� , dx : ���ʨB��j�p
  var xnew = (Math.random() > 0.5)?x+dx:x-dx; // �ζüƨM�w�V���ΦV�k����
  return new Solution(xnew);                  // �إ߷s�ѵ��öǦ^�C
}

Solution.prototype.energy = function() {      // ��q���
  var x = this.v;                             // x:�ѵ�
  return Math.abs(x*x-4);                     // ��q��Ƭ� |x^2-4|
}

Solution.prototype.toString = function() {    // �N�ѵ��ର�r��A�H�ѦL�X�[��C
  return "energy("+this.v.toFixed(3)+")="+this.energy().toFixed(3);
}

module.exports = Solution;                    // �N�ѵ����O�ץX�C