var simulatedAnnealing = require("./simulatedAnnealing"); // �ޤJ�����h���k���O
var solutionNumber = require("./solutionNumber");         // �ޤJ����ڸѵ����O

var sa = new simulatedAnnealing();                        // �إ߼����h���k����
// ��������h���k (�q�u�ѵ�=0.0�v�}�l�M��, �̦h����@�U�N�C
sa.run(new solutionNumber(0.0), 10000);

