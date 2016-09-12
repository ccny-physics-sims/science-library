/*! science-sims - v0.1.0 - 2016-09-12 */ 
/**
* Draws an arrow from one point to another. Useful for vector diagramming.
* @method Arrow
* @param {p5.Vector} origin_ A vector object describing the origin
* @param {p5.Vector} target_ A vector object describing the end point
*/


var somethingIsDragging;

function Arrow(origin_, target_){

  this.origin = origin_.copy();
  this.target = target_.copy();

  //control handles
  this.grab = true;
  this.draggable = true;
  this.showComponents = false;
  this.color = color('rgb(255,255,255)');
  this.selected = false;
  this.dragSelected = false;
  this.isDragging = false;
  this.width = 20;


  //mouse old coordinates for transalation
  this.oldX = 0;
  this.oldY = 0;




this.display = function(){

  push();
  fill(this.color);
  noStroke();
  //draw arrow
  var d = dist(this.origin.x,this.origin.y, this.target.x,this.target.y);
  var w = this.width;
  translate(this.origin.x,this.origin.y);
  var angle = angCalc(this);

  rotate(angle);

  //draw arrow
  if(this.boundChk() && this.draggable==true){
     fill(red(this.color)+(255-red(this.color))/2,green(this.color)+(255-green(this.color))/2,blue(this.color)+(255-blue(this.color))/2);

  }
  if(this.isDragging==true){
     fill(red(this.color)+(255-red(this.color))/2,green(this.color)+(255-green(this.color))/2,blue(this.color)+(255-blue(this.color))/2);
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
this.update = function(){
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


this.boundChk = function() {

  // get distance from the point to the two ends of the line
var d1 = dist(mouseX,mouseY, this.origin.x,this.origin.y);
var d2 = dist(mouseX,mouseY, this.target.x-2,this.target.y-2);

// get the length of the line
var lineLen = dist(this.origin.x,this.origin.y, this.target.x-2,this.target.y-2);
buffer = 2;

if (buffer === undefined){ buffer = 1; }   // higher # = less accurate

// if the two distances are equal to the line's length, the point is on the line!
// note we use the buffer here to give a range, rather than one #

if (d1+d2 >= lineLen-buffer && d1+d2 <= lineLen+buffer) {
  return true;
}
return false;
};

}

function drawArrow(thickness,length,arrow){
  //draw the arrow itself
  translate(0,-thickness/2);
  // rect(0, thickness/4, length, thickness/2);
  // triangle(length, 0, length, thickness, length+15, thickness/2);
  rect(0, thickness/4, length-8, thickness/2);
  triangle(length-8, 0, length-8, thickness, length+(thickness/2), thickness/2);
  //draw handle
  if(arrow.grab === true){
    var d = dist(arrow.target.x,arrow.target.y,mouseX,mouseY);
    if(d < 6){
      fill(40,40);
      strokeWeight(1);
      stroke('black');
      ellipse(length,thickness/2, arrow.width*1.5,arrow.width*1.5);
      if(mouseIsPressed){
        arrow.selected = true;
        fill(255, 255, 0, 150);
        arrow.isDragging = true;
      }
      else{
        arrow.selected = false;
        arrow.isDragging = false;
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
    if(arrow.draggable === true){


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

/**
* Makes a little ball that can move.
* @method Mover
* @param {p5.Vector} position A vector object describing the balls acceleration
* @param {p5.Vector} velocity A vector object describing the ball's velocity
* @param {p5.Vector} acceleration A vector object describing the ball's acceleration
* @param {number} mass A scalar quantity indicating the mass
* @param {p5.Color} color What color do you want the ball to be?
* @property {number} limit how fast can it go? This sets the max speed.
* @property {bool} tail a tail leaves little dots behind as it moves.
* @property {color} outline what color is the stroke of the mass?
*/



var Mover = function(position, velocity, acceleration, mass, color){
  this.position = new createVector(position.x, position.y);
  this.velocity = new createVector(velocity.x, velocity.y);
  this.acceleration = new createVector(acceleration.x, acceleration.y);

  this.limit = 20;
  this.mass = mass;
  this.color = color;
  //size is proportional to mass
  this.size = this.mass;
  this.outline = 255;

  this.tail = false;
  this.tailFill  = 'white';
  this.tailStroke = 'black';
  this.tailA = [];
  //sets up angular variables for rotations
  this.angle = 0;
  this.aVelocity = 0;
  this.aAcceleration = 0;



this.update = function(){
  if(this.tail === true){
    this.tailA.push(this.position.copy());
  }

  this.velocity.add(this.acceleration);
  this.velocity.limit(this.limit);
  this.position.add(this.velocity);
  this.acceleration.mult(0);

  var hCut = 70;
  if(this.tailA.length > hCut){
    this.tailA = this.tailA.slice(-1 * hCut);
  }

  //handles angular momentum
  this.aVelocity += this.aAcceleration;
  this.angle += this.aVelocity;
};

this.display = function(){

  fill(this.color);
  stroke(this.outline);
  ellipse(this.position.x,this.position.y,this.size,this.size);

  if(this.tail === true){
    push();
   fill(this.tailFill);
   stroke(this.tailStroke);
    for(var i = 0; i < this.tailA.length; i++){
      ellipse(this.tailA[i].x,this.tailA[i].y,3,3);
    }
    pop();
  }
};

this.giveItAnAcceleration = function(accel){
  this.acceleration = (accel);
}

this.applyForce = function(force){
  var f = force.copy();
  f.div(this.mass);
  this.acceleration.add(f);
};
//Behaviors
this.wrapEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  }
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  }
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};
// this.bounceEdges = function(){
//   if(this.position.x < 0){
//     this.velocity.x *= -1;
//     this.position.x = 0;
//
//   }
//   if(this.position.x > width){
//     this.velocity.x *= -1;
//     this.position.x = width;
//   }
//
//   if(this.position.y < 0){
//     this.velocity.y *= -1;
//     this.position.y = 0;
//
//   }
//   if(this.position.y > height){
//     this.velocity.y *= -1;
//     this.position.y = height;
//   }
// };
this.bounceEdges = function(){
  if(this.position.x < 0+this.size/2){
    this.velocity.x *= -1;
    this.position.x = 0+this.size/2;

  }
  if(this.position.x > width-this.size/2){
    this.velocity.x *= -1;
    this.position.x = width-this.size/2;
  }

  if(this.position.y < 0+this.size/2){
    this.velocity.y *= -1;
    this.position.y = 0+this.size/2;

  }
  if(this.position.y > height-this.size/2){
    this.velocity.y *= -1;
    this.position.y = height-this.size/2;
  }
};
this.towardMouse = function(a){
  var mouse = new Vector(mouseX,mouseY);
  var dir = Vector.sub(mouse,this.position);
  dir.normalize();
  dir.mult(a);
  this.acceleration = dir;
};

}


Mover.prototype.get = function(){
  var bob = new Mover(this.position,this.velocity,this.acceleration);
  return bob;
};
Mover.get = function(m){
  var bob = new Mover(m.position, m.velocity, m.acceleration);
  return bob;
};

/*spring*/
function Spring(pos_, k_, m_, lengthOfSpring_, oscAmp_,mu_) {
  boxsize = 70;
  //no of coils (purely decorative, odd numbers work better)
  this.noOfCoils = 11;
  //how long is the equilibrium length of the spring, in px
  this.lengthOfSpring = lengthOfSpring_;
  //the transverse amplitude (also purely decorative)
  this.transAmp = 15;
  //time variables
  this.tzero = millis();
  this.time = 0;
  this.play = true;
  //get the starting position of the spring.
  this.xcent = pos_.x;
  this.ycent = pos_.y;
  //how do we want it? horizontal (theta = 0), vertical? (theta = PI/2)
  this.rotation = 0;
  //how big should the oscillation amplitude be? (as a fraction of the lengthOfSpring. i.e 0.5 means it will have an Amplitude equal to half the length of the spring, which is kinda long. 0.2 works good)
  this.oscAmp = oscAmp_;
  //calculate the frequency based on the spring constant k and the mass of the block m
  //The second term in the sqrt accounts for the change in freq due to mu
  this.freq = sqrt(k_/m_- sq(mu_)/(4*sq(m_)));
  //friction coeff
  this.mu = mu_;
  //Mass
  this.m = m_;
  this.k = k_;


  //some kinematics values
  //where is equilibrium?
  this.equilibrium = createVector(this.lengthOfSpring, 0);
  //where is the mass?
  this.displacement = createVector(0, 0);
  //what is its velocity
  this.velocity = createVector(0, 0);
  //and its acceleration?
  this.acceleration = createVector(0, 0);

  //Function used to toggle animation
  this.setPlay = function(play_) {
    this.play=play_;
  }


this.update = function() {
  //Keep track of time
  if (this.play){
    //Animation is running so we update time
    this.time = millis()/1000-this.tzero;
  }
  else {
    //Animation pause "hold" time still
    this.tzero = millis()/1000-this.time;
  }
}

this.display = function() {

  push();
  //Calculate argument for sin and amplitude
  var theta = this.time * this.freq;
  var amp = this.oscAmp * exp((-1*this.mu*this.time)/(2*this.m));

  //Draw the mass at the end
  translate(this.xcent, this.ycent);
  rotate(this.rotation)
  fill(200);
  rect(this.lengthOfSpring - (boxsize / 2) + (this.lengthOfSpring - 60) * amp * sin(theta), -(boxsize / 2), boxsize, boxsize);
  noFill();
  stroke(80);
  strokeWeight(3);

  //Draw the spring
  beginShape();
  //cosmetic start
  curveVertex(-1, 0);
  curveVertex(0, 0);
  curveVertex(5, 0);
  curveVertex(20, 0);
  curveVertex(25, 0);
  //this part makes the coil
  for (var i = 0; i < this.lengthOfSpring - 60; i++) {
    curveVertex(30 + (i * (1 + amp * sin(theta))), -this.transAmp * sin(2 * PI * this.noOfCoils * i / this.lengthOfSpring));
  }
  //cosmetic end
  curveVertex(30 + (i * (1 + amp * sin(theta))) + 5, 0);
  curveVertex(30 + (i * (1 + amp * sin(theta))) + 20, 0);
  curveVertex(30 + (i * (1 + amp * sin(theta))) + 25, 0);
  curveVertex(30 + (i * (1 + amp * sin(theta))) + 30, 0);
  curveVertex(30 + (i * (1 + amp * sin((theta)))) + 31, 0);
  endShape();

  //update the kinematic variables
  this.displacement.x = this.equilibrium.x + ((this.lengthOfSpring-60) * amp * sin(theta));
  //TODO: Multiply Velocity and acceleration vals by actual Amplitude for final result
  this.velocity.x = sqrt(this.k/this.m) * amp * cos(theta);
  this.acceleration.x = -this.k/this.m * (amp * sin(theta));

  pop();
}
}

function drawAxes(){
  line(width/2,0,width/2,height)
  line(0,height/2,width,height/2)
}

var movingBackground = function(whichKind_, position_, velocity_, acceleration_) {
    maxHeight = 100;
    this.velocity = velocity_;
    this.position = position_;
    this.acceleration = acceleration_;
    this.whichKind = whichKind_;
    this.shapes = [];

    if (this.whichKind == 'cityStreet') {
        noOfBuildings = ((5 * width) / 70);
        rectMode(CORNERS);
        for (i = 0; i < noOfBuildings; i++) {
            this.shapes.push(new backgroundShape(this.whichKind, this.velocity))
            this.shapes[i].position = createVector(-(width * 2) + (i * 70), this.position.y);
            this.shapes[i].name = 'bldg ' + i;
            this.shapes[i].layer = i;
            this.shapes[i].scale = 3;
        }

    }

    if (this.whichKind == 'clouds') {
        noOfClouds = ((2 * width) / 10);
        for (i = 0; i < noOfClouds; i++) {
            this.shapes.push(new backgroundShape(this.whichKind, this.velocity))
            this.shapes[i].position = createVector(random(-width, 2 * width), random(-height, 2 * height));
            this.shapes[i].name = 'cloud ' + i;
            this.shapes[i].layer = i;
            this.shapes[i].scale = 2;
        }
    }

    this.l = this.shapes.length;
    this.update = function() {
        this.velocity.add(this.acceleration);
    }

    this.display = function() {
        for (i = this.l - 1; i >= 0; i--) {
            this.shapes[i].run();
        }
    }

}

var backgroundShape = function(whichKind_, velocity_) {

    this.howTall = random(40, maxHeight);
    this.howWide = random(20, 100);
    this.fill = random(60, 230);

    this.whichKind = whichKind_;
    this.velocity = velocity_;




    this.run = function() {
        this.needsMoving()
        this.update();

        //only display the ones near the canvas
        if (this.position.x < width + 100 && this.position.x > -100 && this.position.y > -100 && this.position.y < height + 100) {
            this.display();
        }
    };

    this.update = function() {

        if (this.whichKind == 'cityStreet') {
            rectMode(CORNERS);
            this.position.add(this.velocity);
        }

        if (this.whichKind == 'clouds') {
            this.position.add(p5.Vector.mult(this.velocity, (noOfClouds - this.layer) / noOfClouds));
        }

    };

    this.display = function() {

        if (this.whichKind == 'cityStreet') {

            push();
            fill(this.fill);
            noStroke();
            rect(this.position.x, this.position.y, this.position.x + this.howWide, this.position.y - this.howTall);
            //text(this.name,this.position.x,this.position.y+40)
            pop();

            push();
            stroke(0);
            line(0, this.position.y, width, this.position.y);
            pop();
        }

        if (this.whichKind == 'clouds') {
            this.scale = 2;
            push();
            fill(this.fill, 200);
            noStroke();
            ellipse(this.position.x, this.position.y, this.howWide, this.howWide);
            //text(this.name,this.position.x,this.position.y+40)
            pop();
        }

    };

    this.needsMoving = function() {

        if (this.position.x < -(width * (this.scale - 1))) {
            this.position.x = width * this.scale;
        }
        if (this.position.x > (width * (this.scale))) {
            this.position.x = -width * (this.scale - 1);
        }
        if (this.position.y < -(height * (this.scale - 1))) {
            this.position.y = height * this.scale;
        }
        if (this.position.y > (height * this.scale)) {
            this.position.y = -height * (this.scale - 1);
        }
    };
};

//TODO: wheel object for rotating.
//TODO: make a smart rotate that rotates and moves along
//the ground at the correct (non-slipping) speed.
var wheel = function(_x,_y,_d){
    this.x = _x; //x position
    this.y = _y; //y position
    this.r = _d/2; //radius
    this.d = _d;
    this.arrowDecorations = [];
    this.arrows = [];
    this.rimColor = color('rgba(0,0,0,1)');
    this.spokeColor = color('rgba(0,0,0,1)');
    this.wheelColor = color('rgba(0,0,0,.1)');

    //rotation variables
    this.rotate = false;
    this.ang = 0;
    this.ang_speed = 1;

    //translation variables
    this.trans_speed = 0;

    //decorations for wheel
    this.vdecorate = false;
    this.cdecorate = false;

    //arrow vectors to display(not implemented)
    this.translation = false;
    this.rotation = false;
    this.rollingNoSlip = false;

    //actual arrow objects (only requires 3 to
    //display all of the modes)
    var orig = createVector(this.x,this.y);
    var temp = createVector(this.x+this.r,this.y-this.r);
    this.a1 = new Arrow(orig,temp);
    this.a2 = new Arrow(orig,temp);
    this.a3 = new Arrow(orig,temp);

    this.a1.width = 10;
    this.a2.width = 10;
    this.a3.width = 10;

    this.a1.color = color('green');
    this.a2.color = color('green');
    this.a3.color = color('green');

    this.a1.draggable = false;
    this.a1.grab = false;
    this.a2.draggable = false;
    this.a2.grab = false;
    this.a3.draggable = false;
    this.a3.grab = false;
    //arrow display options
    //-> static/relative




    this.addDecorations = function(_decorations) {

      for(i=0;i<this.arrowDecorations.length;i++){
        this.arrows[i] = new Arrow(createVector(0,this.arrowDecorations[i].location_radial*this.r),createVector(25*this.ang_speed*this.arrowDecorations[i].location_radial,this.arrowDecorations[i].location_radial*this.r));
        this.arrows[i].color = color('green');
        this.arrows[i].width = 10;
        this.arrows[i].draggable = false;
        this.arrows[i].grab = false;
      }

    }

    this.draw = function(){


    push();
    //angleMode(DEGREES);
    translate(this.x,this.y);
    //manage the rotation if this.rotate == true
    if(this.rotate == true){
        rotate(this.ang);
        this.ang += this.ang_speed;
        if(this.ang >= 360) this.ang = 0;
    }
    //draw the circles
    fill(this.wheelColor);
    stroke(this.rimColor);
    strokeWeight(10);
    ellipse(0,0,this.d,this.d);
    //fill(color('rgba(200, 200, 200, .9)'));
    //ellipse(0,0,this.d*0.85,this.d*0.85);
    //fill(10);
    //ellipse(0,0,this.d*0.05,this.d*0.05);

    //draw the spokes of the wheel
    stroke(this.spokeColor);
    strokeWeight(2);
    for(var i = 0;i<16;i++){
        line(0,0,
             (this.r-2)*cos(30*i),
             (this.r-2)*sin(30*i));
    }

    //..............................
    // draw the decorations if any
    //..............................

for(i=0;i<this.arrowDecorations.length;i++){
  push();
  rotate(this.arrowDecorations[i].rimPos);
  this.arrows[i].target.x = -25*this.ang_speed*this.arrowDecorations[i].location_radial;
  this.arrows[i].target.y = this.arrowDecorations[i].location_radial*this.r;
  this.arrows[i].update();
  this.arrows[i].display();
  pop();
}

    if(this.cdecorate == true){
        //tire markers (ie. points A & B) for distance S
            //arc colors for length S
        stroke(255,0,0);
        strokeWeight(4);
        noFill();
        arc(0,0,this.d,this.d,0,180);
        stroke(0,0,255);
        arc(0,0,this.d,this.d,180,360);
            //point colors
        noStroke();
        fill(255,0,0); //red for point A;
        ellipse(this.r,0,10,10);
        fill(30,30,255); //blue for point B;
        ellipse(-this.r,0,10,10);
    }
    pop();

    if(this.vdecorate == true){
        //rotation vector
        if(this.rotation == true){
            //a1 is the top right pointing arrow,
            //and a2 is the bottom left pointing
            //arrow.
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+25*this.ang_speed;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y+this.r;
            this.a2.target.x = this.x-25*this.ang_speed;
            this.a2.target.y = this.y+this.r;

            this.a1.update();
            this.a2.update();
            this.a1.display();
            this.a2.display();
        }
        //translation vector

        if(this.translation == true){
            //a1 is the topmost arrow, a2 is the middle arrow
            //and a3 is the bottom arrow.
            this.a1.origin.x = this.x;
            this.a1.origin.y = this.y-this.r;
            this.a1.target.x = this.x+25*this.trans_speed;
            this.a1.target.y = this.y-this.r;

            this.a2.origin.x = this.x;
            this.a2.origin.y = this.y;
            this.a2.target.x = this.x+25*this.trans_speed;
            this.a2.target.y = this.y;

            this.a3.origin.x = this.x;
            this.a3.origin.y = this.y+this.r;
            this.a3.target.x = this.x+25*this.trans_speed;
            this.a3.target.y = this.y+this.r;

            this.a1.update();
            this.a2.update();
            this.a3.update();
            this.a1.display();
            this.a2.display();
            this.a3.display();

        }
    }
  }
};

wheel.prototype.update = function(){};

function FBD(position_, howManyForces_,showResultant_) {

    this.mag = [];
    this.direction = [];
    this.labels = [];
    this.offsets = [];
    this.position = position_;
    this.howManyForces = howManyForces_;
    this.showResultant = showResultant_;
    if(this.showResultant){
      forcesColor = color(240,150,150);
    }
    else{
      forcesColor = color(230, 40, 40);
    }

    v1 = [];
    if(this.showResultant){
    resultant = new Arrow(position_,position_)
    resultant.color = color(230, 40, 40);
    resultant.grab = false;
    resultant.draggable = false;
    }

    for (var i = 0; i < this.howManyForces; i++) {

        v1[i] = new Arrow(position_, p5.Vector.add(position_, createVector(this.mag[i] * cos(this.direction[i]), this.mag[i] * sin(this.direction[i]))));
        v1[i].grab = false;
        v1[i].draggable = false;
        v1[i].color = forcesColor;

    }


this.update = function() {
    temp1=createVector(0,0);
    for (var i = 0; i < this.howManyForces; i++) {

        v1[i].target = p5.Vector.add(this.position, createVector(this.mag[i] * cos(this.direction[i]), this.mag[i] * sin(this.direction[i])));
        temp1.add(p5.Vector.sub(v1[i].target,v1[i].origin));
        //console.log('arrow #'+ i + v1[i].target);
        v1[i].update();
    }
    if(this.showResultant){
        resultant.target = p5.Vector.add(this.position,temp1);
        resultant.update();
      }

}

this.display = function() {

    for (var i = 0; i < this.howManyForces; i++) {
        fill(0);
        push();
        translate(this.xoffsets[i],this.yoffsets[i]);
        v1[i].display();
        pop();

    }
    for (var i = 0; i < this.howManyForces; i++) {
      push();
      translate(this.xoffsets[i],this.yoffsets[i]);
      text(this.labels[i],15+v1[i].target.x,v1[i].target.y,100,100);
      pop();
    }
    if(this.showResultant){
    text('Net Force',15+resultant.target.x,resultant.target.y,100,100);
    resultant.display()
    }
    //make a dot
    push()
    fill(30,100);
    ellipse(this.position.x, this.position.y, 20, 20)
    pop()


}

}
