'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrayonCrayon = require('./Crayon');
var CrayonCanvas = require('./Canvas');

module.exports = function () {
	function CrayonState() {
		_classCallCheck(this, CrayonState);

		this.canvas = new CrayonCanvas();
		this.canvas.crayon = this.crayon = new CrayonCrayon();
		this.rstack = this.stack = [];
		this.stacks = [];
		this.input = "";
	}

	_createClass(CrayonState, [{
		key: 'enter',
		value: function enter() {
			this.stacks.push(this.stack);
			this.stack = this.stack.last;
		}
	}, {
		key: 'exit',
		value: function exit() {
			if (this.stacks.length === 0) {
				this.rstack = this.stack = [this.stack];
			} else {
				this.stack = this.stacks.pop();
			}
		}
	}, {
		key: 'grab',
		value: function grab() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

			var i = void 0;
			for (i = this.stacks.length - 1; n > 0 && i > -1;) {
				if (this.stacks[i].length <= 1) {
					i--;
				} else {
					this.stack.unshift(this.stacks[i].splice(-2, 1)[0]);
					n--;
				}
			}
			return i > -1;
		}
	}, {
		key: 'steal',
		value: function steal(n) {
			var single = typeof n === "undefined";
			if (single) {
				n = 1;
			}if (this.stack.length < n) {
				var grab = this.grab(n - this.stack.length);
				if (!grab) {
					throw new Error("empty stack");
				}
			}
			if (single) {
				return this.stack.pop();
			}return this.stack.splice(this.stack.length - n, n);
		}
	}, {
		key: 'peek',
		value: function peek() {
			var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			return this.stack[this.stack.length - 1 - n];
		}
	}, {
		key: 'push',
		value: function push() {
			var _stack;

			return (_stack = this.stack).push.apply(_stack, arguments);
		}
	}]);

	return CrayonState;
}();