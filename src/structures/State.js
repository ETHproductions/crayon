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
	
	grab(n = 1) {
		let i;
		for (i = this.stacks.length - 1; n > 0 && i > -1; ) {
			if (this.stacks[i].length <= 1) {
				i--;
			} else {
				this.stack.unshift(this.stacks[i].splice(-2, 1)[0]);
				n--;
			}
		}
		return i > -1;
	}
}
