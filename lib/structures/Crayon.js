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

            this.dir = ((this.dir + num) % 8 + 8) % 8;
        }
    }, {
        key: "rotateTo",
        value: function rotateTo() {
            var num = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

            this.dir = (num % 8 + 8) % 8;
        }
    }]);

    return CrayonCrayon;
}();