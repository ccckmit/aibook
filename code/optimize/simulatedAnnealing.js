var simulatedAnnealing = function() {}       // �����h���k������Ҫ� (���O)

simulatedAnnealing.prototype.P = function(e, enew, T) { // �����h���k�����v���
  if (enew < e) 
    return 1;
  else
    return Math.exp((e-enew)/T);
}

simulatedAnnealing.prototype.run = function(s, maxGens) { // �����h���k���D�n���
  var sbest = s;                              // sbest:��ثe����̨θ�
  var ebest = s.energy();                     // ebest:��ثe����̧C��q
  var T     = 100;                            // �q 100 �׶}�l����
  for (var gens=0; gens<maxGens; gens++) {    // �j��A�̦h�@ maxGens �o��h�N�C
    var snew = s.neighbor();                  // ���o�F�~��
    var e    = s.energy();                    // e    : �ثe�Ѫ���q
    var enew = snew.energy();                 // enew : �F�~�Ѫ���q
    T  = T * 0.999;                           // �C�����C�@�Ƿū�
    if (this.P(e, enew, T) > Math.random()) { // �ھڷū׻P��q�t�Y��l�A�Y�q�L
      s = snew;                               // �h���ʨ�s���F�~��
      console.log("%d T=%s %s", gens, T.toFixed(3), s.toString()); // �L�X�[��
    }
    if (enew < ebest) {                       // �p�G�s�Ѫ���q��̨θѦn�A�h��s�̨θѡC
      sbest = snew;
      ebest = enew;
    }
  }
  console.log("solution: %s", sbest.toString()); // �L�X�̨θ�
  return sbest;                                  // �Ǧ^�̨θ�
}

module.exports = simulatedAnnealing;             // �N�����h���t��k�����O�ץX�C