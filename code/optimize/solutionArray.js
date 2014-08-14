var Solution = require("./solution");         // �ޤJ��H���ѵ����O

Solution.prototype.neighbor = function() {    // �h�ܼƸѵ����F�~��ơC
  var nv = this.v.slice(0);                   // nv=v.clone()=�ثe�ѵ����ƻs�~
  var i = Math.floor(Math.random()*nv.length);// �H������@���ܼ�
  if (Math.random() > 0.5)                    // �Y��l�M�w�n�����Ω��k��
    nv[i] += this.step;
  else
    nv[i] -= this.step;
  return new Solution(nv);                    // �Ǧ^�s�ت��F�~�ѵ��C
}

Solution.prototype.energy = function() {      // ��q���
  var x=this.v[0], y=this.v[1], z=this.v[2];
  return x*x+3*y*y+z*z-4*x-3*y-5*z+8;         // (x^2+3y^2+z^2-4x-3y-5z+8)
}

var numbersToStr=function(array, precision) { // �N�Ʀr�}�C�ର�r�ꪺ��ơC
  var rzStr = "";
  for (var i=0; i<array.length; i++) {
    if (array[i]>=0)
      rzStr+=" "+array[i].toFixed(precision)+" ";
    else
      rzStr+=array[i].toFixed(precision)+" ";
  }
  return rzStr;
}


Solution.prototype.toString = function() {    // �N�ѵ��ର�r�ꪺ��ơA�H�ѦC�L�ΡC
  return "energy("+numbersToStr(this.v, 3)+")="+this.energy().toFixed(3);
}

module.exports = Solution;                    // �N�ѵ����O�ץX�C
