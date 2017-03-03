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
		
		return output;
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
			} else {
				if (char !== " ") this.setChar(this.crayon.x, this.crayon.y, char);
				this.crayon.moveForward();
			}
		}
	}
}
