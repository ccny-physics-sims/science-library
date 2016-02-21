/* arrow */

// this object is useful for diagramming vectors
// it takes two argumensts: the origin and the target, both of which are p5 vectors
// you can grab it, rotate it, and so forth.

var somethingIsDragging;

function Arrow(origin_, target_){

  this.origin = origin_.copy();
  this.target = target_.copy();

  //control handles
  this.grab = true;
  this.drag = true;
  this.showComponents = false;
  this.color = color('rgb(255,255,255)');
  this.selected = false;
  this.dragSelected = false;
  this.isDragging = false;

  //mouse old coordinates for transalation
  this.oldX = 0;
  this.oldY = 0;

}


Arrow.prototype.display = function(){

  push();
  fill(this.color);
  noStroke();
  //draw arrow
  var d = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
  var w = 20;
  translate(this.origin.x,this.origin.y);
  var angle = angCalc(this);

  rotate(angle);

  //draw arrow
  if(this.boundChk()){
    fill(red(this.color)/2,green(this.color)/2,blue(this.color)/2);
  }
  drawArrow(w,d,this);
  pop();//reset drawing state

  //draw components if requested
  if(this.showComponents === true){
    push();
    strokeWeight(2);
    stroke(this.color);
    textSize(18);
    line(this.origin.x, this.origin.y, this.target.x, this.origin.y);
    line(this.origin.x, this.origin.y, this.origin.x, this.target.y);
    pop();
    push();
    fill(0);
    text("y: " + (Math.round(-1*(this.target.y-this.origin.y))).toString(), this.origin.x, this.target.y);
    text("x: " + (Math.round(this.target.x-this.origin.x)).toString(), this.target.x,this.origin.y);
    pop();
  }

};
Arrow.prototype.update = function(){
  if(this.selected){

    this.target.x = mouseX;
    this.target.y = mouseY;
  }
  else if(this.dragSelected){

    if(this.oldX !== mouseX && this.oldX !== 0){

      this.target.x += mouseX - this.oldX;
      this.origin.x += mouseX - this.oldX;
    }

    if(this.oldY !== mouseY && this.oldY !== 0){
      this.target.y += mouseY - this.oldY;
      this.origin.y += mouseY - this.oldY;
    }

    this.oldX = mouseX;
    this.oldY = mouseY;

  }
};


Arrow.prototype.boundChk = function() {

  // get distance from the point to the two ends of the line
var d1 = dist(mouseX,mouseY, this.origin.x,this.origin.y);
var d2 = dist(mouseX,mouseY, this.target.x,this.target.y);

// get the length of the line
var lineLen = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
buffer = 2;

if (buffer === undefined){ buffer = 1; }   // higher # = less accurate

// if the two distances are equal to the line's length, the point is on the line!
// note we use the buffer here to give a range, rather than one #

if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
  return true;
}
return false;
};

function drawArrow(thickness,length,arrow){
  //draw the arrow itself
  translate(0,-thickness/2);
  // rect(0, thickness/4, length, thickness/2);
  // triangle(length, 0, length, thickness, length+15, thickness/2);
  rect(0, thickness/4, length-10, thickness/2);
  triangle(length-10, 0, length-10, thickness, length+5, thickness/2);
  //draw handle
  if(arrow.grab === true){
    var d = dist(arrow.target.x,arrow.target.y,mouseX,mouseY);

    if(d < 6){
      noFill();
      strokeWeight(2);
      stroke(arrow.color);
      ellipse(length,thickness/2, 12,12);
      if(mouseIsPressed){
        arrow.selected = true;
        fill(255, 255, 0, 150);
      }
      else{
        arrow.selected = false;
        fill(255,255,255,200);
      }

    }
    else{
      noFill();
    }

    //strokeWeight(2);
    //stroke(arrow.color);
    //ellipse(length,thickness/2, 12,12);

    //drag handle
    if(arrow.drag === true){


      if(arrow.boundChk()){
        if(mouseIsPressed){

          arrow.dragSelected = true;
          arrow.isDragging = true;
          somethingIsDragging = true;
          if(!arrow.isDragging){
            if(somethingIsDragging){
              arrow.oldX = arrow.oldX;
              arrow.oldY = arrow.oldY;
            }
          }
          else {
          arrow.oldX = mouseX;
          arrow.oldY = mouseY;
          fill(255,255,0,100);
        }
        }
        else{
          arrow.dragSelected = false;
          arrow.isDragging = false;
          somethingIsDragging = false;
          fill(255,255,255,100);
          this.oldX = 0;
          this.oldY = 0;
        }

      }
      else{
        noFill();
      }


    if(arrow.selected && arrow.dragSelected){
      arrow.dragSelected = false;
    }

    }
  }


}


function angCalc(arrow){
  //angleMode(DEGREES);
  return atan2(arrow.target.y-arrow.origin.y,arrow.target.x-arrow.origin.x);
};
