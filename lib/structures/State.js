'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrayonCrayon = require('./Crayon');
var CrayonCanvas = require('./Canvas');

module.exports = function CrayonState() {
	var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
	    _ref$crayon = _ref.crayon,
	    crayon = _ref$crayon === undefined ? new CrayonCrayon() : _ref$crayon,
	    _ref$canvas = _ref.canvas,
	    canvas = _ref$canvas === undefined ? new CrayonCanvas() : _ref$canvas,
	    _ref$stack = _ref.stack,
	    stack = _ref$stack === undefined ? [] : _ref$stack;

	_classCallCheck(this, CrayonState);

	this.crayon = crayon;
	this.canvas = canvas;
	this.rstack = stack;
	this.stack = stack;
};