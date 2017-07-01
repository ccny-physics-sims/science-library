/**
* Creates a simple x-y axis.
* @constructor Axes
* @param {object} options Customize the default properties. (Optional)
* @property {object} styles The styles. 
* @property {color} lineColor The color of the lines. (default: black)
* @property {number} lineThickness The thickness of the lines. (default: 1px)
* @property {number} rotateBy Rotate axes by degrees or radians. (default: 0)
* @property {object} bounds Set the bounds of the axes. (default: { minX: 0, maxX: 500, minY: 0, maxY: 500 })
* @property {method} Axes.display() Displays the axes. 

* @example 
 
* function setup() {
*   createCanvas(500, 500);
*   myAxes = new Axes();
*   myAxes.display();
* }
 
* @example 
* function setup() {
*   createCanvas(500, 500);
*   var customSettings = {lineColor : 'blue', lineThickness : 5}
*   myAxes = new Axes(customSettings);
*   myAxes.display();
* }
*/

function Axes(options) {
    this.options = options || {};
    this.styles = typeof options.styles !== undefined ? options.styles : {};
    this.lineColor = (typeof this.lineColor !== "undefined") ?
        this.lineColor :
        "black";
    this.lineThickness = (typeof this.lineThickness !== "undefined") ?
        this.lineThickness :
        1;
    this.rotateBy = typeof options.rotateBy !== "undefined" ?
        options.rotateBy :
        0;
    this.bounds = typeof options.bounds !== "undefined" ?
        options.bounds : {
            minX: 0,
            maxX: 500,
            minY: 0,
            maxY: 500
        };
    // this doesn't work yet with origins that aren't smack in the middle
    this.origin = typeof options.origin !== "undefined" ?
        options.origin : {
            x: (this.bounds.minX + this.bounds.maxX) / 2,
            y: (this.bounds.minY + this.bounds.maxY) / 2
        };
    this.highlightOrigin = typeof options.highlightOrigin !== "undefined" ?
        options.highlightOrigin : {
            on: false
        };
    if (this.highlightOrigin.on) {
        this.highlightOrigin.fillColor = (typeof options.highlightOrigin.fillColor !==
                "undefined") ?
            options.highlightOrigin.fillColor :
            "red";
        this.highlightOrigin.size = typeof options.highlightOrigin.size !==
            "undefined" ?
            options.highlightOrigin.size :
            10;
    }
    this.display = function() {
        push();
        rotate(this.rotateBy);
        stroke(this.styles.lineColor);
        strokeWeight(this.styles.lineThickness);
        line(
            this.bounds.maxX / 2,
            this.bounds.minY,
            this.bounds.maxX / 2,
            this.bounds.maxY
        );
        line(
            this.bounds.minX,
            this.bounds.maxY / 2,
            this.bounds.maxX,
            this.bounds.maxY / 2
        );
        pop();
        if (this.highlightOrigin.on) {
            push();
            translate(0, -this.bounds.minY);
            fill(this.highlightOrigin.fillColor);
            ellipse(this.origin.x, this.origin.y, this.highlightOrigin.size);
            pop();
        }
    };
}
