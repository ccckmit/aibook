var hillClimbing = require("./hillClimbing");        // �ޤJ���s�t��k���O
var solutionNumber = require("./solutionNumber");    // �ޤJ����ڸѵ����O

var hc = new hillClimbing();                         // �إߪ��s�t��k����
// ���檦�s�t��k (�q�u�ѵ�=0.0�v�}�l�M��, �̦h�Q�U�N�B���Ѥ@�d���N���X�C
hc.run(new solutionNumber(0.0), 100000, 1000);
