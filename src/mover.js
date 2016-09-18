/**
* Makes a little ball that can move. This object is to be replaced by KineticMass
* @constructor Mover
* @param {p5.Vector} position A vector object describing the balls acceleration
* @param {p5.Vector} velocity A vector object describing the ball's velocity
* @param {p5.Vector} acceleration A vector object describing the ball's acceleration
* @param {number} mass A scalar quantity indicating the mass
* @param {p5.Color} color What color do you want the ball to be?
* @property {number} limit how fast can it go? This sets the max speed.
* @property {bool} tail a tail leaves little dots behind as it moves.
* @property {color} outline what color is the stroke of the mass?
* @deprecated
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
