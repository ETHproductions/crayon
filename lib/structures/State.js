'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CrayonCrayon = require('./Crayon');
var CrayonCanvas = require('./Canvas');

module.exports = function CrayonState() {
	_classCallCheck(this, CrayonState);

	this.canvas = new CrayonCanvas();
	this.canvas.crayon = this.crayon = new CrayonCrayon();
	this.rstack = [];
	this.stack = [];
	this.input = "";
};