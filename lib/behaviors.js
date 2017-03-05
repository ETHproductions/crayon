'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CrayonFunc = require('./structures/Func');
var Char = require('./structures/Char');
var Big = require('bignumber.js');

function ty(a) {
	if (a === undefined || a === null) {
		return "";
	}if (a.constructor === Array) {
		return "A";
	}if (a.constructor === Big) {
		return "N";
	}if (a.hasOwnProperty("data")) {
		return "C";
	}if (a.constructor === RegExp) {
		return "R";
	}if (a.constructor === String) {
		return "S";
	}
}

function clone(obj) {
	if (ty(obj) === "A") {
		return obj.slice();
	}if (ty(obj) === "C") {
		return new Char(obj.data);
	}if (ty(obj) === "N") {
		return obj.plus(0);
	}return obj;
}

function array(obj) {
	if (ty(obj) === "A") {
		return obj;
	}if (ty(obj) === "C") {
		return [obj];
	}if (ty(obj) === "S") {
		var _a = [].concat(_toConsumableArray(obj));

		var _f = function _f(x) {
			return new Char(x);
		};

		var _r = [];

		for (var _i = 0; _i < _a.length; _i++) {
			_r.push(_f(_a[_i], _i, _a));
		}

		return _r;
	}if (ty(obj) === "N") {
		var range = [];
		for (obj = obj.round(0, 0); obj.s === 1 && +obj;) {
			obj = obj.minus(1);
			range.unshift(obj);
		}
		return range;
	}
}

module.exports = new Map([['•', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(0); /* more to come */
	} })], ['→', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(0);
	} })], ['↘', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(1);
	} })], ['↓', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(2);
	} })], ['↙', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(3);
	} })], ['←', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(4);
	} })], ['↖', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(5);
	} })], ['↑', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(6);
	} })], ['↗', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateTo(7);
	} })], ['⤸', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(1);
	} })], ['⤵', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(2);
	} })], ['↷', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(3);
	} })], ['⟲', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(4);
	} })], ['↶', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(5);
	} })], ['⤷', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(6);
	} })], ['⤹', new CrayonFunc(0, { _: function _(state) {
		state.crayon.rotateBy(7);
	} })], ['n', new CrayonFunc(0, { _: function _(state) {
		state.crayon.moveBy(0, -1);
	} })], ['s', new CrayonFunc(0, { _: function _(state) {
		state.crayon.moveBy(0, +1);
	} })], ['w', new CrayonFunc(0, { _: function _(state) {
		state.crayon.moveBy(-1, 0);
	} })], ['e', new CrayonFunc(0, { _: function _(state) {
		state.crayon.moveBy(+1, 0);
	} })], ['q', new CrayonFunc(1, { O: function O(state, o) {
		state.canvas.writeString(o + "");state.stack.push(o);
	} })], ['X', new CrayonFunc(1, {
	N: function N(state, n) {
		state.crayon.x = +n;
	},
	O: function O(state, x) {
		state.stack.push(x);
	}
})], ['Y', new CrayonFunc(1, {
	N: function N(state, n) {
		state.crayon.y = +n;
	},
	O: function O(state, x) {
		state.stack.push(x);
	}
})], ['x', new CrayonFunc(1, {
	N: function N(state, n) {
		state.crayon.x += +n;
	},
	O: function O(state, x) {
		state.stack.push(x);
	}
})], ['y', new CrayonFunc(1, {
	N: function N(state, n) {
		state.crayon.y += +n;
	},
	O: function O(state, x) {
		state.stack.push(x);
	}
})], ['C', new CrayonFunc(2, {
	NN: function NN(state, a, b) {
		state.crayon.moveTo(a, b);
	},
	SS: function SS(state, a, b) {
		state.stack.push(new Big(a.indexOf(b)));
	}
})], ['c', new CrayonFunc(2, {
	NN: function NN(state, a, b) {
		state.crayon.moveBy(a, b);
	},
	SS: function SS(state, a, b) {
		state.stack.push(new Big(a.lastIndexOf(b)));
	}
})],

// Input
['E', new CrayonFunc(0, { _: function _(state) {
		state.stack.push(state.input);state.input = "";
	} })], ['L', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/.+/) || [""])[0]);state.input = state.input.replace(/^.+\n?/, "");
	} })], ['T', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/\S+/) || [""])[0]);state.input = state.input.replace(/^\S+\s?/, "");
	} })], ['Z', new CrayonFunc(0, { _: function _(state) {
		state.stack.push((state.input.match(/^[^]+?(?=\n\n|\n$|$)/) || "")[0]);state.input = state.input.replace(/^[^]+?(\n\n|\n$|$)/, "");
	} })], [':', new CrayonFunc(1, { O: function O(state, o) {
		state.stack.push(o, clone(o));
	} })], [';', new CrayonFunc(1, { O: function O(state, o) {/* not a no-op, pops the item from the stack */} })], ['\\', new CrayonFunc(2, { OO: function OO(state, a, b) {
		state.stack.push(b, a);
	} })], ['@', new CrayonFunc(3, { OOO: function OOO(state, a, b, c) {
		state.stack.push(b, c, a);
	} })], ['[', new CrayonFunc(0, { _: function _(state) {
		state.stack.push([]);state.enter();
	} })], [']', new CrayonFunc(0, { _: function _(state) {
		state.exit();
	} })], ['_', new CrayonFunc(1, { O: function O(state, o) {
		state.stack.push(array(o));state.enter();
	} })], ['l', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.push(n);
	},
	O: function O(state, x) {
		state.stack.push(x.length);
	}
})], ['(', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.push(n.minus(1));
	},
	S: function S(state, x) {
		state.stack.push(x[0], x.slice(1));
	},
	A: function A(state, x) {
		state.stack.push(x[0], x.slice(1));
	}
})], [')', new CrayonFunc(1, {
	N: function N(state, n) {
		state.stack.push(n.plus(1));
	},
	S: function S(state, x) {
		state.stack.push(x.slice(-1)[0], x.slice(0, -1));
	},
	A: function A(state, x) {
		state.stack.push(x.slice(-1)[0], x.slice(0, -1));
	}
})], ['*', new CrayonFunc(2, {
	NN: function NN(state, x, y) {
		state.stack.push(x.times(y));
	},
	_SN: function _SN(state, s, n) {
		state.stack.push(s.repeat(n));
	},
	_SA: function _SA(state, s, a) {
		state.stack.push(a.join(s));
	}
})]]);