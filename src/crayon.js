export default class CrayonCrayon {
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
		this.dir = ((this.dir + num) % 8 + 8) % 8;
	}
    rotateTo (num = 0) {
		this.dir = (num % 8 + 8) % 8;
	}
}
