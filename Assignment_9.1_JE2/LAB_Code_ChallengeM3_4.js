class Point {
    constructor(x, y) {
        this.type = "point";
        this.x = x;
        this.y = y;
    }
}

class Line {
    constructor(pointsArray) {
        this.type = "line";
        this.points = pointsArray.map(p => new Point(p[0], p[1]));
    }
}

class Figure {
    constructor(elements = []) {
        this.points = [];
        this.lines = [];

        elements.forEach(el => {
            if (el.type === "point") {
                this.points.push(el);
            } else if (el.type === "line") {
                this.lines.push(el);
            }
        });
    }

    addPoint(x, y) {
        this.points.push(new Point(x, y));
    }

    addLine(pointsArray) {
        this.lines.push(new Line(pointsArray));
    }

    toJSON() {
        return JSON.stringify({
            points: this.points,
            lines: this.lines
        });
    }

    fromJSON(jsonData, append = true) {
        const data = JSON.parse(jsonData);

        if (!append) {
            this.deleteAll();
        }

        data.points.forEach(p => {
            this.points.push(new Point(p.x, p.y));
        });

        data.lines.forEach(l => {
            let coords = l.points.map(p => [p.x, p.y]);
            this.lines.push(new Line(coords));
        });
    }

    deleteAll() {
        this.points = [];
        this.lines = [];
    }
}



let figure = new Figure();

figure.addPoint(10, 20);
figure.addPoint(5, 15);
figure.addLine([[0, 0], [10, 20], [20, 20]]);

console.log("Original Data:");
console.log(figure);

let jsonData = figure.toJSON();
console.log("JSON:");
console.log(jsonData);

// Load from JSON
let newFigure = new Figure();
newFigure.fromJSON(jsonData);

console.log("Loaded From JSON:");
console.log(newFigure);

// Delete everything
newFigure.deleteAll();
console.log("After deleteAll:");
console.log(newFigure);