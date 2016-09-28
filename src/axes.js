/**
* Draws an simple x-y axis system
* @constructor drawAxes
* @param {color} lineColor the color of the lines
* @param {num} thickness how thick are the axes lines
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
