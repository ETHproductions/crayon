'use strict';

let CrayonCrayon = require('./Crayon');
let CrayonCanvas = require('./Canvas');

module.exports = class CrayonState {
	constructor() {
		this.canvas = new CrayonCanvas();
		this.canvas.crayon = this.crayon = new CrayonCrayon();
		this.rstack = this.stack = [];
		this.stacks = [];
		this.input = "";
	}
	
	enter() {
		this.stacks.push(this.stack);
		this.stack = this.stack.last;
	}
	
	exit() {
		this.stack = this.stacks.pop();
	}
}
