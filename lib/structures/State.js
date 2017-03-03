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
			this.stack = this.stacks.pop();
		}
	}]);

	return CrayonState;
}();