/* jshint -W061 */
/* jshint -W093 */

'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var CrayonCanvas = require('./structures/Canvas');
var CrayonState = require('./structures/State');
var Char = require('./structures/Char');
var behaviors = require('./behaviors');
var Big = require('big.js');

function ty(a) {
	if (a === undefined || a === null) {
		return "";
	}if (a.constructor === Array) {
		return "A";
	}if (a.constructor === Big) {
		return "N";
	}if (a.constructor === Char) {
		return "C";
	}if (a.constructor === RegExp) {
		return "R";
	}if (a.constructor === String) {
		return "S";
	}
}

function prettyprint(a) {
	if (a === null) {
		return "null";
	}if (a === undefined) {
		return "undefined";
	}if (ty(a) === "A") {
		var _a = a;
		var _f = prettyprint;
		var _r = [];

		for (var _i = 0; _i < _a.length; _i++) {
			_r.push(_f(_a[_i], _i, _a));
		}

		return "[ " + _r.join(", ") + " ]";
	}if (ty(a) === "N") {
		return a.toString();
	}if (ty(a) === "S") {
		return JSON.stringify(a);
	}if (ty(a) === "C") {
		return "`" + a;
	}throw new TypeError("Can't prettyprint", JSON.stringify(a));
}

if (![1].last) {
	Object.defineProperty(Array.prototype, 'last', {
		get: function get() {
			return this[this.length - 1];
		},
		set: function set(x) {
			return this[this.length - 1] = x;
		}
	});
	Object.defineProperty(Array.prototype, 'last2', {
		get: function get() {
			return this[this.length - 2];
		},
		set: function set(x) {
			return this[this.length - 2] = x;
		}
	});
}

function truthy(a) {
	if (ty(a) === "N") {
		return a + "" !== "0";
	}if (ty(a) === "C") {
		return a.code !== 0;
	}if (ty(a) === "A" || ty(a) === "S") {
		return a.length > 0;
	}return !!a;
}

function falsy(a) {
	return !truthy(a);
}

function equal(a, b) {
	if (ty(a) !== ty(b)) {
		return false;
	}if (a === undefined || b === undefined) {
		return false;
	}if (ty(a) === "S") {
		return a === b;
	}if (ty(a) === "C") {
		return a.code === b.code;
	}if (ty(a) === "A") {
		return prettyprint(a) === prettyprint(b);
	}if (ty(a) === "N") {
		return a + "" === b + "";
	}return a === b;
}

module.exports = {
	run: function run(code) {
		var input = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
		var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
		var debug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

		function delog() {
			if (debug) {
				console.log.apply(console, arguments);
			}
		}
		delog(" code:", code.replace(/\n/g, "\n      "));
		delog("input:", input.replace(/\n/g, "\n      "));
		delog(" args:", "[" + args.join(", ") + "]");

		var _a2 = args;

		var _f2 = function _f2(x) {
			return (/^['"]/.test(x) ? eval(x) : x[0] === "`" ? new Char(x[1]) : /^(\d+\.?\d*|\.\d+)$/.test(x) ? Big(x) : null
			);
		};

		var _r2 = [];

		for (var _i2 = 0; _i2 < _a2.length; _i2++) {
			_r2.push(_f2(_a2[_i2], _i2, _a2));
		}

		args = _r2;

		var state = new CrayonState();
		state.input = input;
		if (args.length > 0) {
			state.stack.push(args[0]);
		}function c(char) {
			var func = behaviors.get(char);
			if (!func) {
				return;
			}var arity = func.arity;
			var funcs = func.behavior;

			if (state.stack.length < arity) {
				throw new Error("empty stack");
			}var args = state.stack.splice(state.stack.length - arity, arity);

			var success = false;
			function att(f, a) {
				if (success) {
					return;
				}if (typeof funcs[f] === "function") {
					var _funcs$f;

					success = true;
					var _a3 = a;

					var _f3 = function _f3(i) {
						return args[i];
					};

					var _r3 = [];

					for (var _i3 = 0; _i3 < _a3.length; _i3++) {
						_r3.push(_f3(_a3[_i3], _i3, _a3));
					}

					(_funcs$f = funcs[f]).call.apply(_funcs$f, [null, state].concat(_toConsumableArray(_r3)));
				}
			}
			var _a4 = args;
			var _f4 = ty;
			var _r4 = [];

			for (var _i4 = 0; _i4 < _a4.length; _i4++) {
				_r4.push(_f4(_a4[_i4], _i4, _a4));
			}

			var types = _r4;

			if (arity === 0) {
				att("_", []);
			} else if (arity === 1) {
				att(types[0], [0]);
				att("O", [0]);
			} else if (arity === 2) {
				att(types[0] + types[1], [0, 1]);
				att("_" + types[0] + types[1], [0, 1]);
				att("_" + types[1] + types[0], [1, 0]);
				att(types[0] + "O", [0, 1]);
				att("_" + types[0] + "O", [0, 1]);
				att("_" + types[1] + "O", [1, 0]);
				att("OO", [0, 1]);
			} else if (arity === 3) {
				att(types[0] + types[1] + types[2], [0, 1, 2]);
				att("OOO", [0, 1, 2]);
			}
		}

		// **************** 
		// This section creates a map of the control flow of the program.
		// The map is put into a variable called "map".
		// Each item in map is:
		// {type: "literal", value: 123}
		// {type: "command", value: "l"}
		// {type: "conditional", value: "=", jump: 4}
		// {type: "jump", else: 6, cond: true}
		// {type: "else", end: 9}
		// {type: "while", end: 9}
		// {type: "for", value: [1,2,3], index: 0, end: 9, break: false}
		// {type: "break", end: 9}
		// {type: "continue", start: 5}
		// {type: "loopvar", start: 5}
		// {type: "endloop", start: 5}

		var tokens = code.match(/\d*\.\d+|\d+|[.Dd](?:.|$)|"(?:`.|[^"])*"|'([gimtxd]*')?(?:`.|[^'])*'|`.|./g) || [];
		delog("tokens:", tokens);
		var controls = /^[OWz!<=>]$/,
		    indices = [],
		    map = [],
		    i = void 0,
		    t = void 0,
		    loops = void 0;
		for (i = 0; i < tokens.length; i++) {
			t = tokens[i];
			loops = indices.filter(function (x) {
				return (/while|for/.test(map[x].type)
				);
			});
			if (/^"/.test(t)) {
				map.push({ type: "literal", value: eval(t) });
			} else if (/^`/.test(t)) {
				map.push({ type: "literal", value: new Char(t[1]) });
			} else if (/^\.?\d/.test(t)) {
				map.push({ type: "literal", value: Big(t) });
			} else if (/^'/.test(t)) {
				throw new TypeError("Can't handle regex yet :(");
			} else if (/^[<=>!z]$/.test(t)) {
				indices.push(map.length);
				map.push({ type: "conditional", value: t, jump: -1 });
			} else if (t === "W") {
				indices.push(map.length);
				map.push({ type: "while", end: -1 });
			} else if (t === "O") {
				indices.push(map.length);
				map.push({ type: "for", end: -1, value: null, index: null });
			} else if (/^I/i.test(t) && loops.length > 0) {
				map.push({ type: t === 'I' ? "loopitem" : "loopindex", start: loops.last });
			} else if (/^J/i.test(t) && loops.length > 1) {
				map.push({ type: t === 'J' ? "loopitem" : "loopindex", start: loops.last2 });
			} else if (t === "break") {
				/* What operator? */
				if (loops.length > 0) {
					map.push({ type: "break", start: loops.last });
				} else {
					throw new Error("Break outside a loop? I don't think so!");
				}
			} else if (t === "continue") {
				/* What operator? */
				if (loops.length > 0) {
					map.push({ type: "continue", start: loops.last });
				} else {
					throw new Error("Continue outside a loop? I don't think so!");
				}
			} else if (t === "?") {
				map[indices.last].jump = map.length;
				map.push({ type: "jump", else: -1, cond: null });
			} else if (t === "{") {
				if (map[indices.last].jump < 0) {
					map[indices.last].jump = indices.last + 1;
					map.splice(indices.last + 1, 0, { type: "jump", else: -1, cond: null });
				}
				map.push({ type: "else", end: -1 });
				map[map[indices.last].jump].else = map.length;
			} else if (t === "}") {
				if (/while|for/.test(map[indices.last].type)) {
					map.push({ type: "endloop", start: indices.last });
					map[indices.last].end = map.length;
				} else {
					if (map[indices.last].jump < 0) {
						map[indices.last].jump = indices.last + 1;
						map.splice(indices.last + 1, 0, { type: "jump", else: -1, cond: null });
					}
					if (map[map[indices.last].jump].else < 0) {
						map[map[indices.last].jump].else = map.length;
					} else {
						map[map[map[indices.last].jump].else - 1].end = map.length;
					}
				}
				indices.pop();
			} else map.push({ type: "command", value: t });

			if (i + 1 === tokens.length && indices.length) {
				tokens.push("}");
			}
		}
		delog("map:", map);

		for (i = 0; i < map.length; i++) {
			t = map[i];
			// delog("Executing index", i, "which is", t);
			if (t.type === "literal") {
				state.stack.push(t.value);
			} else if (t.type === "command") {
				c(t.value);
			} else if (t.type === "conditional") {
				var result;
				if (t.value === "z") {
					result = truthy(state.stack.last);
				} else if (t.value === "!") {
					result = falsy(state.stack.last);
				} else if (t.value === "=") {
					result = 1 in state.stack && equal(state.stack.last, state.stack.last2);
				}map[t.jump].cond = result;
			} else if (t.type === "jump") {
				if (!t.cond) {
					i = t.else - 1;
				}
			} else if (t.type === "else") {
				i = t.end - 1;
			} else if (t.type === "while") {
				if (falsy(state.stack.last) || t.break) {
					t.break = false, i = t.end - 1;
				}
			} else if (t.type === "for") {
				if (t.index === null) {
					t.index = 0;
					t.value = state.stack.pop();
				} else t.index++;
				if (!t.break && (ty(t.value) === "N" ? t.value.cmp(t.index) === 1 : t.index < t.value.length)) {
					state.stack.push(ty(t.value) === "N" ? Big(t.index) : t.value[t.index]);
				} else {
					t.value = null;
					t.index = null;
					t.break = false;
					i = t.end - 1;
				}
			} else if (t.type === "loopitem") {
				state.stack.push(ty(map[t.start].value) === "N" ? Big(map[t.start].index) : map[t.start].value[map[t.start].index]);
			} else if (t.type === "loopindex") {
				state.stack.push(Big(map[t.start].index));
			} else if (t.type === "break") {
				map[t.start].break = true;
				i = t.start - 1;
			} else if (t.type === "continue") {
				i = t.start - 1;
			} else if (t.type === "endloop") {
				i = t.start - 1;
			}
		}

		delog("stack:", prettyprint(state.rstack));

		return state;
	}
};