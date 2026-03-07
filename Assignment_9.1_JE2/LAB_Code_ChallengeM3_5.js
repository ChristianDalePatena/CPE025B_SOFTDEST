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
        this.elements = {
            points: [],
            lines: []
        };

        elements.forEach(el => {
            if (el.type === "point") {
                this.elements.points.push(el);
            } 
            else if (el.type === "line") {
                this.elements.lines.push(el);
            }
        });

        this.cleanUp();
    }

    addPoint(x, y) {
        this.elements.points.push(new Point(x, y));
        this.cleanUp();
    }

    addLine(pointsArray) {
        this.elements.lines.push(new Line(pointsArray));
        this.cleanUp();
    }

    toJSON() {
        return JSON.stringify(this.elements);
    }

    fromJSON(jsonData, append = true) {
        const data = JSON.parse(jsonData);

        if (!append) {
            this.deleteAll();
        }

        data.points.forEach(p => {
            this.elements.points.push(new Point(p.x, p.y));
        });

        data.lines.forEach(l => {
            let coords = l.points.map(p => [p.x, p.y]);
            this.elements.lines.push(new Line(coords));
        });

        this.cleanUp();
    }

    deleteAll() {
        this.elements.points = [];
        this.elements.lines = [];
    }

    static isSamePoint(point1, point2) {
        return point1 && point2 &&
            point1.x === point2.x &&
            point1.y === point2.y;
    }

    static isSameLine(line1, line2) {
        let retVal = line1 && line2 &&
            line1.points &&
            line2.points &&
            line1.points.length === line2.points.length;

        if (retVal) {
            retVal = line1.points.every((p, i) => {
                let {x, y} = line2.points[i];
                return p.x === x && p.y === y;
            });
        }

        return retVal;
    }

    sortPoints() {
        this.elements.points = this.elements.points.sort(
            (p1, p2) => p2.x - p1.x === 0 ? p2.y - p1.y : p2.x - p1.x
        );
    }

    sortLines() {
        this.elements.lines = this.elements.lines.sort((l1, l2) => {
            let retVal = 0;

            for (let i = 0; i < l1.points.length; i++) {
                retVal = l2.points[i].x - l1.points[i].x === 0
                    ? l2.points[i].y - l1.points[i].y
                    : l2.points[i].x - l1.points[i].x;

                if (retVal) {
                    break;
                }
            }

            return retVal;
        });
    }

    cleanUp() {
        this.sortPoints();

        this.elements.points = this.elements.points.reduce(
            (p, c) => Figure.isSamePoint(p[p.length - 1], c)
                ? p
                : (p.push(c), p),
            []
        );

        this.sortLines();

        this.elements.lines = this.elements.lines.reduce(
            (p, c) => Figure.isSameLine(p[p.length - 1], c)
                ? p
                : (p.push(c), p),
            []
        );
    }
}



let figure = new Figure();

figure.addPoint(10, 20);
figure.addPoint(10, 20); 
figure.addPoint(5, 5);

figure.addLine([[0,0],[10,10]]);
figure.addLine([[0,0],[10,10]]); 
figure.addLine([[5,5],[15,15]]);

console.log(figure);
console.log("JSON:", figure.toJSON());