"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
	function CrayonCrayon() {
		var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
		    _ref$x = _ref.x,
		    x = _ref$x === undefined ? 0 : _ref$x,
		    _ref$y = _ref.y,
		    y = _ref$y === undefined ? 0 : _ref$y,
		    _ref$dir = _ref.dir,
		    dir = _ref$dir === undefined ? 0 : _ref$dir;

		_classCallCheck(this, CrayonCrayon);

		this.x = x;
		this.y = y;
		this.dir = dir;
	}

	_createClass(CrayonCrayon, [{
		key: "moveBy",
		value: function moveBy() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			this.x += x;
			this.y += y;
		}
	}, {
		key: "moveTo",
		value: function moveTo() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.x;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.y;

			this.x = x;
			this.y = y;
		}
	}, {
		key: "rotateBy",
		value: function rotateBy() {
			var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			this.rotateTo(this.dir + num);
		}
	}, {
		key: "rotateTo",
		value: function rotateTo() {
			var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

			this.moveForward(-1);
			this.dir = (num % 8 + 8) % 8;
			this.moveForward(+1);
		}
	}, {
		key: "moveForward",
		value: function moveForward() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			dir = ((this.dir + dir) % 8 + 8) % 8;
			this.x += [+x, +x, 0, -x, -x, -x, 0, +x][dir];
			this.y += [0, +x, +x, +x, 0, -x, -x, -x][dir];
		}
	}]);

	return CrayonCrayon;
}();