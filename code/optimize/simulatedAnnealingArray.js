var simulatedAnnealing = require("./simulatedAnnealing"); // �ޤJ�����h���k���O
var solutionArray = require("./solutionArray");           // �ޤJ�h�ܼƸѵ����O (x^2+3y^2+z^2-4x-3y-5z+8)

var sa = new simulatedAnnealing();                        // �إ߼����h���k����
// ��������h���k (�q�u�ѵ�(x,y,z)=(1,1,1)�v�}�l�M��, �̦h���� 2 �U�N�C
sa.run(new solutionArray([1,1,1]), 20000);