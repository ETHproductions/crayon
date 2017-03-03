'use strict';

let CrayonCrayon = require('./Crayon');
let CrayonCanvas = require('./Canvas');

module.exports = class CrayonState {
	constructor() {
		this.canvas = new CrayonCanvas();
		this.canvas.crayon = this.crayon = new CrayonCrayon();
		this.rstack = [];
		this.stack = [];
		this.input = "";
	}
}
