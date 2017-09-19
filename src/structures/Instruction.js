function nextID() {
	var currID = Instruction.currID;
	if (typeof currID === "undefined") currID = "";
	currID = [...currID];
	for (var i = currID.length - 1; i >= 0; i--) {
		if (currID[i] < 'Z') {
			currID[i] = (parseInt(currID[i], 36) + 1).toString(36).toUpperCase();
			return Instruction.currID = currID.join("");
		}
		currID[i] = 'A';
	}
	currID.unshift('A');
	return Instruction.currID = currID.join("");
}

class Instruction {
	constructor(value) {
		if (value instanceof Instruction)
			return value;
		this.next = null;
		this.program = null;
		this.id = nextID();
		for (let key of Object.getOwnPropertyNames(value)) {
			this[key] = value[key];
		}
	}

	append(item) {
		item = new Instruction(item);
		item.program = this.program;
		if (this.program !== null)
			this.program.add(item);

		let next = this.next;

		this.next = item;
		if (next !== null) {
			item.next = next;
		}
	}
}

module.exports = Instruction;
