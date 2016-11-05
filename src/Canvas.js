export default class CrayonCanvas {
    constructor(text = "") {
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
        
        for (y = minY; y <= maxY; output += "\n", ++y)
            for (x = minX; x <= maxX; ++x)
                output += (this.data[y] || [])[x] || " ";
        
        return output;
    }
}
