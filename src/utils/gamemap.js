import Constants from './constants'

const puzzleMap3 = [
  "ullurdruldrdluldrulurddr",
  "llurdrulurdldluurrdlldrr",
  "uulldrdlurrdllurrulldrrulddr",
  "luurddluruldlurrddluldrr",
  "luldrulurdldruruldrdllurrd",
  "uulldrrdluurddluldrr",
  "luruldrdlluurdldrurdllurdr",
  "lulurdrulddrullurddlurdr",
  "lulurdrulddluurrdd",
  "uldluurrdllurdruldrd",
  "ullurdldruurddluruldrd",
  "ululdrdruulldrurdd",
  "ullurrdldrullurdldrurd",
  "uulddluurdrulddluurddr",
  "luurddluulddruulddrurd",
  "ulldruurddluulddruurdluldrrd",
  "lluruldrruldrdllurrulddr",
  "luldrrullurrddlurd",
  "uuldldrulurdrulddrulldrurd",
  "uuldrullddruulddrrulldrr",
  "uulddlurdruulddruuldldrr",
  "ulldrruulddlurrullddrr",
  "lurulddrullurdldruulddrr",
  "luuldrdlurruldrdluruldrd",
  "uuldlurddruuldldrr",
  "ulldrurdlluruldrdlururdd",
  "ulurdlldrruulddrullurddr",
  "uulddruuldldrulurddruuldldrr",
  "lulurddluurdrdllurrulldrrd",
  "uuldrullddrrulldruuldrdr",
  "luldrulurrddlurd",
  "uuldrdllurrdlluruldrrulddr",
  "uldlurulddruurddluurdlldrr",
  "luurddlulurrdldluurrdd",
  "uullddrurulldrrdluruldrd",
  "luuldrrdllurrulldrdrulurdd",
  "ulldrulurddruuldrd",
  "llururddllurulddrurd",
  "ululddruldrruldlurdrulurdd",
  "luulddrrulurddlulurrdd",
  "luuldrrdlluurdruldldrr",
  "uuldldrurdlurulldrrdluurdd",
  "uullddruldrruuldrulldrdr",
  "llurrdlluurddlurrulddr",
  "uldrulurddlluruldrrd",
  "ululddrurullddruuldrrulddr",
  "uullddrruullddrurullddrr",
  "ulldruuldrrdluurdluldrrd",
  "uulldrdrulurddluuldrrd",
  "llurrulldrrdllurrdluurdd",
  "ulldruuldrrdlurullddrr",
  "lluruldrrdllurruldrd",
  "ululddruruldldrruldlurrd",
  "luuldrurdlulddrurd",
  "uuldrdluruldlurddlurrd",
  "luruldlurdldrulurdrd",
  "uullddrurdluurdlulddruldrr",
  "llururddllurulddrr",
  "uulldrdluurddlurrulddr",
  "uulddlurdruulldrdlurulddrr",
  "ululddruurddlurulldrrd",
  "luurdldluurddruldlurrd",
  "uuldldruuldrrdlurulddr",
  "uldrulldrrullurrdllurddr",
  "lulurrdllurdldrruulddlurdr",
  "uldluurdlurrddluurddllurrd",
  "uldrulldruulddrurulldrrd",
  "uullddruulddrruullddrr",
  "luurddluruldldrruuldrd",
  "uldrulldrrullurrdllurdrd",
  "ullurdldrurdluruldrd",
  "uldruuldlurddluurddr",
  "llururddluuldrurdluldrdr",
  "ulldrulurdrulddrulldrr",
  "llururddluurdlldrulurdrd",
  "ululdrurddluruldrdllurrulddr",
  "uldrulldruuldrurdd",
  "ulldrulurrdllurddr",
  "uldlurdrulldrulurrdlldrr",
  "ulurddlulurdldrr",
  "lluurrdldluurrdllurddr",
  "luuldrdlurrdluldrr",
  "uldrulldrrulurdllurdrd",
  "uuldldrulurrddluuldrrd",
  "uuldldruuldrurddlurd",
  "ulurdldrulldrruldr",
  "llurrulldrrdluruldrd",
  "llurulddrurdluruldldrr",
  "uuldlurdldrurulldrurdd",
  "uuldrdluldrurulldrrd",
  "ulldrruullddrr",
  "uuldlurdldrurullddrr",
  "lurullddruruldlurddr",
  "uldlururddllurrulddr",
  "uullddrrululddruuldrurdd",
  "lluurdrdlluurddluurrdd",
  "uulddluurdrdluldruruldlurdrd",
  "lulurrdlldrrulurdldr",
  "uldruuldldrulurddr"
];

const getRandom = function (max) {
	var arr=[]
	
	var is_test= false
	if(is_test){
		for (var i=1;i<=max;i++){
			arr.push(i)
		}			
		
	}else{
		for(var i=0;i<max;i++){
			var _v =  getRandomOne(max);
			while(-1!=arr.indexOf(_v)){
				_v =  getRandomOne(max);
			}	
			arr.push(_v)
		} 		
	}
	//console.log("随机数组",arr);
	return arr; 
}
const getRandomOne = function(max) {
    return Math.floor(Math.random() * Math.floor(max)+1);
}


export default function (stage = Constants.EASY) {
  switch (stage) {
    case Constants.EASY:
      return getRandom(3*3*2-1);
    case Constants.MIDDLE:
      return getRandom(4*4*2-1);
    case Constants.HARD:
      return getRandom(5*5*2-1);
    default:
      return getRandom(3*3*2-1);
  }
}