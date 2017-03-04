"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Char = function () {
	function Char() {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "\0";

		_classCallCheck(this, Char);

		this.data = text[0];
	}

	_createClass(Char, [{
		key: "code",
		get: function get() {
			return this.data.charCodeAt(0);
		},
		set: function set(c) {
			this.data = String.fromCharCode(c);
			return c;
		}
	}]);

	return Char;
}();

;

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
	var _loop = function _loop() {
		var key = _step.value;

		if (typeof String.prototype[key] !== "function" || key === "constructor") {
			return "continue";
		}Char.prototype[key] = function () {
			var _data;

			return (_data = this.data)[key].apply(_data, arguments);
		};
	};

	for (var _iterator = Object.getOwnPropertyNames(String.prototype)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
		var _ret = _loop();

		if (_ret === "continue") {
			continue;
		}
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

module.exports = Char;