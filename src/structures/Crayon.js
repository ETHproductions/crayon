module.exports = class CrayonCrayon {
	constructor({
		x = 0,
		y = 0,
		dir = 0
	} = {}) {
		this.x = x;
		this.y = y;
		this.dir = dir;
	}

	moveBy (x = 0, y = 0) {
		this.x += x;
		this.y += y;
	}
	moveTo (x = this.x, y = this.y) {
		this.x = x;
		this.y = y;
	}
	
	rotateBy (num = 0) {
		this.rotateTo(this.dir + num);
	}
	rotateTo (num = 0) {
		this.moveForward(-1);
		this.dir = (num % 8 + 8) % 8;
		this.moveForward(+1);
	}
	
	moveForward (x = 1, dir = 0) {
		dir = ((this.dir + dir) % 8 + 8) % 8;
		this.x += [+x, +x,  0, -x, -x, -x,  0, +x][dir];
		this.y += [ 0, +x, +x, +x,  0, -x, -x, -x][dir];
	}
}
