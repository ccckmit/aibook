var hillClimbing = require("./hillClimbing");      // �ޤJ���s�t��k���O
var solutionArray = require("./solutionArray");    // �ޤJ�h�ܼƸѵ����O (x^2+3y^2+z^2-4x-3y-5z+8)

var hc = new hillClimbing();                       // �إߪ��s�t��k����
// ���檦�s�t��k (�q�u�ѵ�(x,y,z)=(1,1,1)�v�}�l�M��, �̦h�Q�U�N�B���Ѥ@�d���N���X�C
hc.run(new solutionArray([1,1,1]), 100000, 1000);
