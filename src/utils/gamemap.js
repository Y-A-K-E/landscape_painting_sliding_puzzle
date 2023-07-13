import Constants from './constants'

const getRandom = function (max) {
	var arr = []

	var is_test = false
	//测试的时候,生成一个顺序数组. 方便调试通关信息用.
	//不测试的时候,生成一个随机乱序数组. 正常游戏用
	if (is_test) {
		for (var i = 1; i <= max; i++) {
			arr.push(i)
		}

	} else {
		for (var i = 0; i < max; i++) {
			var _v = getRandomOne(max);
			while (-1 != arr.indexOf(_v)) {
				_v = getRandomOne(max);
			}
			arr.push(_v)
		}
	}
	//console.log("随机数组",arr);
	return arr;
}
const getRandomOne = function (max) {
	return Math.floor(Math.random() * Math.floor(max) + 1);
}


export default function (stage = Constants.EASY) {
	switch (stage) {
		case Constants.EASY:
			return getRandom(3 * 3 * 2 - 1); //随机数组长度.也就是最终分割的块数
		case Constants.MIDDLE:
			return getRandom(4 * 4 * 2 - 1);
		case Constants.HARD:
			return getRandom(5 * 5 * 2 - 1);
		default:
			return getRandom(3 * 3 * 2 - 1);
	}
}