/**
* Draws a simple x-y axis.
* @constructor drawAxes
* @param {color} lineColor The color of the lines. (default: black)
* @param {num} thickness The thickness of the lines. (default: 1px)
* @property {method} drawAxes(lineColor,thickness) Draws axes.
*/


function drawAxes(lineColor,thickness){
  push();
  this.lineColor = 'black';
  this.thickness = 1;
  stroke(this.lineColor)
  strokeWeight(this.thickness);
  line(width/2,0,width/2,height)
  line(0,height/2,width,height/2)
  pop();
}
