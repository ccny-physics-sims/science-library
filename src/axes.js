/**
* Draws an simple x-y axis system
* @constructor drawAxes
* @param {color} lineColor the color of the lines
* @param {num} thickness how thick are the axes lines
*/


function drawAxes(lineColor=0,thickness=1){
  push();
  stroke(lineColor)
  strokeWeight(thickness);
  line(width/2,0,width/2,height)
  line(0,height/2,width,height/2)
  pop();
}
