class Char {
	constructor(text = "\0") {
		this.data = text[0];
	}
	
	get code() {
		return this.data.charCodeAt(0);
	}
	set code(c) {
		this.data = String.fromCharCode(c);
		return c;
	}
};

for(let key of Object.getOwnPropertyNames(String.prototype)) {
	if (typeof String.prototype[key] !== "function") continue;
	Char.prototype[key] = function (...args) {
		return this.data[key](...args);
	}
}

module.exports = Char;
