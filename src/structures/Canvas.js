let CrayonCrayon = require('./Crayon');

module.exports = class CrayonCanvas {
	constructor(text = "",
				crayon = new CrayonCrayon()) {
		this.crayon = crayon;
		this.data = [];
		let lines = text.split("\n"),
			i, j;
		for (i in lines)
			for (j in lines[i])
				this.setChar(j, i, lines[i][j]);
	}
	
	setChar(x, y, char) {
		if (!this.data[y])
			this.data[y] = [];
		this.data[y][x] = char;
	}
	
	render() {
		let minX = 1/0,
			minY = 1/0,
			maxX = -1/0,
			maxY = -1/0,
			x, y, output = "";
		for (y in this.data) {
			if (+y < minY) minY = +y;
			if (+y > maxY) maxY = +y;
			for (x in this.data[y]) {
				if (+x < minX) minX = +x;
				if (+x > maxX) maxX = +x;
			}
		}
		
		for (y = minY; y <= maxY; output += "\n", ++y) {
			let row = this.data[y] || [];
			for (x = minX; x <= maxX; ++x)
				output += row[x] || " ";
		}
		
		return output.slice(0, -1); // remove trailing newline
	}
	
	writeString(string) {
		let crayonX = this.crayon.x,
			crayonY = this.crayon.y,
			crayonD = this.crayon.dir;
		
		for (let char of string) {
			if (char === "↵" || char === "\n") {
				this.crayon.x = crayonX;
				this.crayon.y = crayonY;
				this.crayon.dir = crayonD;
				this.crayon.moveForward(1, 2);
				crayonX = this.crayon.x;
				crayonY = this.crayon.y;
			} else if (char === "→" || char === "\x01") {
				this.crayon.rotateTo(0);
			} else if (char === "↘" || char === "\x02") {
				this.crayon.rotateTo(1);
			} else if (char === "↓" || char === "\x03") {
				this.crayon.rotateTo(2);
			} else if (char === "↙" || char === "\x04") {
				this.crayon.rotateTo(3);
			} else if (char === "←" || char === "\x05") {
				this.crayon.rotateTo(4);
			} else if (char === "↖" || char === "\x06") {
				this.crayon.rotateTo(5);
			} else if (char === "↑" || char === "\x07") {
				this.crayon.rotateTo(6);
			} else if (char === "↗" || char === "\x08") {
				this.crayon.rotateTo(7);
			} else if (char === "➥" || char === "\x10") {
				this.crayon.moveForward(1, 2);
			} else if (char === "➦" || char === "\x11") {
				this.crayon.moveForward(1, -2);
			} else if (char === "⤸" || char === "\x12") {
				this.crayon.rotateBy(1);
			} else if (char === "⤵" || char === "\x13") {
				this.crayon.rotateBy(2);
			} else if (char === "↷" || char === "\x14") {
				this.crayon.rotateBy(3);
			} else if (char === "⟲" || char === "\x15") {
				this.crayon.rotateBy(4);
			} else if (char === "↶" || char === "\x16") {
				this.crayon.rotateBy(5);
			} else if (char === "⤷" || char === "\x17") {
				this.crayon.rotateBy(6);
			} else if (char === "⤹" || char === "\x18") {
				this.crayon.rotateBy(7);
			} else if (char === " ") {
				this.crayon.moveForward();
			} else {
				if (char === "¤" || char === "\x1F" || char === "\xA0") char = " ";
				this.setChar(this.crayon.x, this.crayon.y, char);
				this.crayon.moveForward();
			}
		}
	}
}
