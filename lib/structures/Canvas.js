"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) { descriptor.writable = true; } Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) { defineProperties(Constructor.prototype, protoProps); } if (staticProps) { defineProperties(Constructor, staticProps); } return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrayonCrayon = require('./Crayon');

module.exports = function () {
	function CrayonCanvas() {
		var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
		var crayon = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new CrayonCrayon();

		_classCallCheck(this, CrayonCanvas);

		this.crayon = crayon;
		this.data = [];
		var lines = text.split("\n"),
		    i = void 0,
		    j = void 0;
		for (i in lines) {
			for (j in lines[i]) {
				this.setChar(j, i, lines[i][j]);
			}
		}
	}

	_createClass(CrayonCanvas, [{
		key: "setChar",
		value: function setChar(x, y, char) {
			if (!this.data[y]) {
				this.data[y] = [];
			}this.data[y][x] = char;
		}
	}, {
		key: "render",
		value: function render() {
			var minX = 1 / 0,
			    minY = 1 / 0,
			    maxX = -1 / 0,
			    maxY = -1 / 0,
			    x = void 0,
			    y = void 0,
			    output = "";
			for (y in this.data) {
				if (+y < minY) {
					minY = +y;
				}if (+y > maxY) {
					maxY = +y;
				}for (x in this.data[y]) {
					if (+x < minX) {
						minX = +x;
					}if (+x > maxX) {
						maxX = +x;
					}
				}
			}

			for (y = minY; y <= maxY; output += "\n", ++y) {
				var row = this.data[y] || [];
				for (x = minX; x <= maxX; ++x) {
					output += row[x] || " ";
				}
			}

			return output.slice(0, -1); // remove trailing newline
		}
	}, {
		key: "writeString",
		value: function writeString(string) {
			var crayonX = this.crayon.x,
			    crayonY = this.crayon.y,
			    crayonD = this.crayon.dir;

			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = string[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var char = _step.value;

					if (char === "↵" || char === "\n") {
						this.crayon.x = crayonX;
						this.crayon.y = crayonY;
						this.crayon.dir = crayonD;
						this.crayon.moveForward(1, 2);
						crayonX = this.crayon.x;
						crayonY = this.crayon.y;
					} else if (char === "→" || char === "\x01") {
						this.crayon.rotateTo(0);
					} else if (char === "↘" || char === "\x02") {
						this.crayon.rotateTo(1);
					} else if (char === "↓" || char === "\x03") {
						this.crayon.rotateTo(2);
					} else if (char === "↙" || char === "\x04") {
						this.crayon.rotateTo(3);
					} else if (char === "←" || char === "\x05") {
						this.crayon.rotateTo(4);
					} else if (char === "↖" || char === "\x06") {
						this.crayon.rotateTo(5);
					} else if (char === "↑" || char === "\x07") {
						this.crayon.rotateTo(6);
					} else if (char === "↗" || char === "\x08") {
						this.crayon.rotateTo(7);
					} else if (char === "➥" || char === "\x10") {
						this.crayon.moveForward(1, 2);
					} else if (char === "➦" || char === "\x11") {
						this.crayon.moveForward(1, -2);
					} else if (char === "⤸" || char === "\x12") {
						this.crayon.rotateBy(1);
					} else if (char === "⤵" || char === "\x13") {
						this.crayon.rotateBy(2);
					} else if (char === "↷" || char === "\x14") {
						this.crayon.rotateBy(3);
					} else if (char === "⟲" || char === "\x15") {
						this.crayon.rotateBy(4);
					} else if (char === "↶" || char === "\x16") {
						this.crayon.rotateBy(5);
					} else if (char === "⤷" || char === "\x17") {
						this.crayon.rotateBy(6);
					} else if (char === "⤹" || char === "\x18") {
						this.crayon.rotateBy(7);
					} else if (char === " ") {
						this.crayon.moveForward();
					} else {
						if (char === "¤" || char === "\x1F" || char === "\xA0") {
							char = " ";
						}this.setChar(this.crayon.x, this.crayon.y, char);
						this.crayon.moveForward();
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
		}
	}]);

	return CrayonCanvas;
}();