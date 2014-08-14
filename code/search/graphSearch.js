var util = require("util");

var printf = function() {
  return process.stdout.write(util.format.apply(null, arguments)); 
}

function enqueue(a, o) { a.push(o); }
function dequeue(a) { return a.shift(); }

var g = {            // graph: �Q�j�M������
  1: {n:[2,5], v:0}, // n: neighbor (�F�~), v: visited (�O�_�Q�X�ݹL)
  2: {n:[3,4], v:0},
  3: {n:[4,5,6], v:0},
  4: {n:[5,6], v:0},
  5: {n:[6], v:0},
  6: {n:[], v:0}
};

function init(g) { // ��l�ơB�]�w visited �� 0
  for (i in g) g[i].v = 0;
}

function dfs(g, node) { // �`���u���j�M
  if (g[node].v !=0) return;   // �p�G�w�X�ݹL�A�N���A�X��
  printf("%d=>", node);       // �_�h�B�L�X�`�I
  g[node].v = 1;              //   �ó]�w���w�X��
  var neighbors = g[node].n;  // ���X�F�~�`�I
  for (var i in neighbors) {  // ���C�ӾF�~
    dfs(g, neighbors[i]);     //   �v�@�i��X��
  }
}

var queue=[1];            // BFS �Ϊ� queue, �_�l�I�� 1�C

function bfs(g, q) { // �s���u���j�M
  if (q.length == 0) return; // �p�G queue �w�šA�h��^�C
  var node = dequeue(q);     // �_�h�B���X queue ���Ĥ@�Ӹ`�I�C
  if (g[node].v == 0)        // �p�G�Ӹ`�I�|�����X�L�C
    g[node].v = 1;           //   �Хܬ��w���X
  else                       // �_�h (�w�X�ݹL)
    return;                  //   ���~��j�M�A������^�C
  printf("%d=>", node);      // �L�X�`�I
  var neighbors = g[node].n; // ���X�F�~�C
  for (var i in neighbors) { // ���C�ӾF�~
    var n = neighbors[i];
    if (!g[n].visited)       // ���p�ӾF�~�٨S�Q���X�L
      q.push(n);             //   �N��J queue ��
  }
  bfs(g, q);
}

printf("dfs:"); init(g); dfs(g, 1); printf("\n");     // �I�s�`���u���j�M�C
printf("bfs:"); init(g); bfs(g, queue); printf("\n"); // �I�s�s���u���j�M�C

