## 專家系統 - 以 JavaScript 實作

### 前向推論程式

以下是一個代表鴕鳥的動物世界規則庫。

規則庫：animal_ostrich.kb

```
哺乳類 <= 有毛. 
哺乳類 <= 泌乳. 
鳥類   <= 有羽毛. 
鳥類   <= 會飛 & 生蛋. 
食肉類 <= 哺乳類 & 吃肉.
食肉類 <= 有爪 & 利齒 & 兩眼前視.
有蹄類 <= 哺乳類 & 有蹄.
偶蹄類 <= 哺乳類 & 反芻.
獵豹   <= 哺乳類 & 吃肉 & 斑點.
老虎   <= 哺乳類 & 吃肉 & 條紋.
長頸鹿 <= 有蹄類 & 長腿 & 斑點.
斑馬   <= 有蹄類 & 條紋.
鴕鳥   <= 鳥類 & 長腿.

會飛. 
生蛋. 
長腿. 
```

接著我們採用前述的「布林邏輯推論引擎 kb.js」，透過讀入規則檔並進行推論的方式，設計出「前向推論」的程式。

檔案：kbReason.js

```javascript
var fs = require('fs'); // 引用檔案物件
var kb = require('./kb');

var kb1 = new kb();
var code = fs.readFileSync(process.argv[2], "utf8").replace(/\n/gi, ""); // 讀取檔案

kb1.load(code);
kb1.forwardChaining();
```

以下是上述「隱含鴕鳥前提」的規則庫經過「前向布林引擎」推論後得到的執行結果。

```
C:\Dropbox\Public\web\ai\code\KB>node kbReason animal_ostrich.kb
["哺乳類 <= 有毛","哺乳類 <= 泌乳","鳥類   <= 有羽毛","鳥類   <= 會飛 & 生蛋","
食肉類 <= 哺乳類 & 吃肉","食肉類 <= 有爪 & 利齒 & 兩眼前視","有蹄類 <= 哺乳類 &
有蹄","偶蹄類 <= 哺乳類 & 反芻","獵豹   <= 哺乳類 & 吃肉 & 斑點","老虎   <= 哺乳
類 & 吃肉 & 條紋","長頸鹿 <= 有蹄類 & 長腿 & 斑點","斑馬   <= 有蹄類 & 條紋","鴕
鳥   <= 鳥類 & 長腿","會飛","生蛋","長腿",""]
rule:head=哺乳類 terms=["有毛"]
rule:head=哺乳類 terms=["泌乳"]
rule:head=鳥類 terms=["有羽毛"]
rule:head=鳥類 terms=["會飛 "," 生蛋"]
rule:head=食肉類 terms=["哺乳類 "," 吃肉"]
rule:head=食肉類 terms=["有爪 "," 利齒 "," 兩眼前視"]
rule:head=有蹄類 terms=["哺乳類 "," 有蹄"]
rule:head=偶蹄類 terms=["哺乳類 "," 反芻"]
rule:head=獵豹 terms=["哺乳類 "," 吃肉 "," 斑點"]
rule:head=老虎 terms=["哺乳類 "," 吃肉 "," 條紋"]
rule:head=長頸鹿 terms=["有蹄類 "," 長腿 "," 斑點"]
rule:head=斑馬 terms=["有蹄類 "," 條紋"]
rule:head=鴕鳥 terms=["鳥類 "," 長腿"]
rule:head=會飛 terms=""
rule:head=生蛋 terms=""
rule:head=長腿 terms=""
addFact(會飛)
addFact(生蛋)
addFact(長腿)
addFact(鳥類)
addFact(鴕鳥)
facts=["會飛","生蛋","長腿","鳥類","鴕鳥"]
```

### 互動式推論

當然、我們不一定要將「隱含前提」直接寫死在規則庫當中，也可以透過互動的方式讓使用者輸入這些「隱含前提」，透過互動的方式讓「推理引擎」推論出結果，以下是這種互動式推論的一個執行範例。

首先、我們只要將以下的動物世界推論規則放在 animal.kb 規則檔中。

```
哺乳類 <= 有毛. 
哺乳類 <= 泌乳. 
鳥類   <= 有羽毛. 
鳥類   <= 會飛 & 生蛋. 
食肉類 <= 哺乳類 & 吃肉.
食肉類 <= 有爪 & 利齒 & 兩眼前視.
有蹄類 <= 哺乳類 & 有蹄.
偶蹄類 <= 哺乳類 & 反芻.
獵豹   <= 哺乳類 & 吃肉 & 斑點.
老虎   <= 哺乳類 & 吃肉 & 條紋.
長頸鹿 <= 有蹄類 & 長腿 & 斑點.
斑馬   <= 有蹄類 & 條紋.
鴕鳥   <= 鳥類 & 長腿.
```

接著撰寫一個通用的推論程式 kbQuery.js，其原始碼如下所示：

檔案：kbQuery.js

```javascript
var fs = require('fs'); // 引用檔案物件
var kb = require('./kb');

var kb1 = new kb();
var code = fs.readFileSync(process.argv[2], "utf8").replace(/\n/gi, ""); // 讀取檔案
kb1.load(code);
kb1.forwardChaining();

var r = require('readline').createInterface(process.stdin, process.stdout);
r.setPrompt('?- ');
r.prompt();

r.on('line', function(line) {
  var term = line.trim();
  kb1.addFact(term);
  kb1.forwardChaining();
  r.prompt();
}).on('close', function() {
  process.exit(0);
});
```

然後、我們就可以透過互動的方式，輸入指定的前提，推理系統將會適時推論出我們想要查詢的動物，以下是一個執行的過程範例。

```
C:\Dropbox\Public\web\ai\code\KB>node kbQuery animal.kb
["哺乳類 <= 有毛","哺乳類 <= 泌乳","鳥類   <= 有羽毛","鳥類   <= 會飛 & 生蛋","
食肉類 <= 哺乳類 & 吃肉","食肉類 <= 有爪 & 利齒 & 兩眼前視","有蹄類 <= 哺乳類 &
有蹄","偶蹄類 <= 哺乳類 & 反芻","獵豹   <= 哺乳類 & 吃肉 & 斑點","老虎   <= 哺乳
類 & 吃肉 & 條紋","長頸鹿 <= 有蹄類 & 長腿 & 斑點","斑馬   <= 有蹄類 & 條紋","鴕
鳥   <= 鳥類 & 長腿",""]
rule:head=哺乳類 terms=["有毛"]
rule:head=哺乳類 terms=["泌乳"]
rule:head=鳥類 terms=["有羽毛"]
rule:head=鳥類 terms=["會飛 "," 生蛋"]
rule:head=食肉類 terms=["哺乳類 "," 吃肉"]
rule:head=食肉類 terms=["有爪 "," 利齒 "," 兩眼前視"]
rule:head=有蹄類 terms=["哺乳類 "," 有蹄"]
rule:head=偶蹄類 terms=["哺乳類 "," 反芻"]
rule:head=獵豹 terms=["哺乳類 "," 吃肉 "," 斑點"]
rule:head=老虎 terms=["哺乳類 "," 吃肉 "," 條紋"]
rule:head=長頸鹿 terms=["有蹄類 "," 長腿 "," 斑點"]
rule:head=斑馬 terms=["有蹄類 "," 條紋"]
rule:head=鴕鳥 terms=["鳥類 "," 長腿"]
facts=[]
?- 有毛
addFact(有毛)
addFact(哺乳類)
facts=["有毛","哺乳類"]
?- 吃肉
addFact(吃肉)
addFact(食肉類)
facts=["有毛","哺乳類","吃肉","食肉類"]
?- 條紋
addFact(條紋)
addFact(老虎)
facts=["有毛","哺乳類","吃肉","食肉類","條紋","老虎"]
?-
```

您可以看到當我們輸入了「有毛、吃肉、條紋」等三個屬性之後，系統推論出了「老虎」這個結論，這正式動物世界專家系統所應該傳回的結果，不是嗎？

