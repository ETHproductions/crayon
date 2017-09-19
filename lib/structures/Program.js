"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Instruction = require('./Instruction');

var Program = function () {
	function Program() {
		_classCallCheck(this, Program);

		this.curr = null;
		this.instructions = [];
	}

	_createClass(Program, [{
		key: "add",
		value: function add(obj) {
			obj.program = this;
			if (!this.instructions.includes(obj)) {
				this.instructions.push(obj);
			}
		}
	}, {
		key: "next",
		value: function next() {
			if (this.curr === null) {
				throw new RangeError("trying to access empty Program");
			}

			this.curr = this.curr.next;
			return this.curr;
		}
	}, {
		key: "goto",
		value: function goto(obj) {
			this.curr = new Instruction(obj);
			this.add(obj);
			return this;
		}
	}, {
		key: "insert",
		value: function insert() {
			if (this.curr === null) {
				throw new RangeError("trying to access empty Program");
			}

			for (var _len = arguments.length, objs = Array(_len), _key = 0; _key < _len; _key++) {
				objs[_key] = arguments[_key];
			}

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = objs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var obj = _step.value;

					obj = new Instruction(obj);
					this.curr.append(obj);
					this.curr = this.curr.next;
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return this;
		}
	}]);

	return Program;
}();

module.exports = Program;