const Instruction = require('./Instruction');

class Program {
	constructor() {
		this.curr = null;
		this.instructions = [];
	}

	add(obj) {
		obj.program = this;
		if (!this.instructions.includes(obj))
			this.instructions.push(obj);
	}

	next() {
		if (this.curr === null) {
			throw new RangeError("trying to access empty Program");
		}

		this.curr = this.curr.next;
		return this.curr;
	}

	goto(obj) {
		this.curr = new Instruction(obj);
		this.add(obj);
		return this;
	}

	insert(...objs) {
		if (this.curr === null) {
			throw new RangeError("trying to access empty Program");
		}

		for (var obj of objs) {
			obj = new Instruction(obj);
			this.curr.append(obj);
			this.curr = this.curr.next;
		}

		return this;
	}
}

module.exports = Program;
