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

			return output;
		}
	}, {
		key: "writeString",
		value: function writeString(string) {
			var crayonX = this.crayon.x,
			    crayonY = this.crayon.y,
			    crayonD = this.crayon.dir;
		}
	}]);

	return CrayonCanvas;
}();