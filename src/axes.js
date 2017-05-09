/**
* Draws a simple x-y axis.
* @constructor Axes
* @param {color} lineColor The color of the lines. (default: black)
* @param {num} thickness The thickness of the lines. (default: 1px)
* @property {method} Axes.display() Displays the axes. 
* @example 
* function setup() {
* createCanvas(500, 500);
*  myAxes = new Axes();
* myAxes.display();
* }
* @example 
* function setup() {
* createCanvas(500, 500);
* myAxes = Axes('blue', 5);
* myAxes.display();
* }
*/

function Axes(lineColor, thickness) {
  this.lineColor = lineColor || "black";
  this.thickness = thickness || 1;
  this.display = function() {
    push();
    stroke(this.lineColor);
    strokeWeight(this.thickness);
    line(width / 2, 0, width / 2, height);
    line(0, height / 2, width, height / 2);
    pop();
  };
}
