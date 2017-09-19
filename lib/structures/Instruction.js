"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function nextID() {
	var currID = Instruction.currID;
	if (typeof currID === "undefined") {
		currID = "";
	}currID = [].concat(_toConsumableArray(currID));
	for (var i = currID.length - 1; i >= 0; i--) {
		if (currID[i] < 'Z') {
			currID[i] = (parseInt(currID[i], 36) + 1).toString(36).toUpperCase();
			return Instruction.currID = currID.join("");
		}
		currID[i] = 'A';
	}
	currID.unshift('A');
	return Instruction.currID = currID.join("");
}

var Instruction = function () {
	function Instruction(value) {
		_classCallCheck(this, Instruction);

		if (value instanceof Instruction) {
			return value;
		}this.next = null;
		this.program = null;
		this.id = nextID();
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.getOwnPropertyNames(value)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var key = _step.value;

				this[key] = value[key];
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
	}

	_createClass(Instruction, [{
		key: "append",
		value: function append(item) {
			item = new Instruction(item);
			item.program = this.program;
			if (this.program !== null) {
				this.program.add(item);
			}var next = this.next;

			this.next = item;
			if (next !== null) {
				item.next = next;
			}
		}
	}]);

	return Instruction;
}();

module.exports = Instruction;