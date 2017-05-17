/**
* Creates a Spring object. Consists of a spring with a block attached to the end. 
* @constructor Spring
* @param {p5.Vector} position The origin of the Spring. 
* @param {number} k Spring coefficient.
* @param  {number} m Mass of the block attached to the spring.
* @param  {number} lengthOfSpring Length of the Spring in px.
* @param  {number} oscAmp Amplitude of the oscillation.
* @param  {number} mu Coefficient of friction.

* @property {number} boxSize Length of the sides of the box attached to spring.
* @property {number} lengthOfSpring The current length of the spring in pixels. 
* @property {number} noOfCoils The number of coils. Decorative. Odd numbers work best. (default: 11)
* @property {number} transAmp Transverse amplitude. Decorative. (default: 15)
* @property {number} tZero The start time in milliseconds.
* @property {number} t Time. (default: 0)
* @property {bool} playing Controls the state of the simulation. 
* @property {number} xCent x-coord for the center of the spring.
* @property {number} yCent y-coord for the center of the spring.
* @property {radian} rotation Angle of orientation. Use 0 for a horizontal spring, and PI/2 for a vertical one. 
* @property {number} oscamp  The oscillation amplitude as a fraction of the lengthOfSpring. A value of 0.2 is recommended as it will be 1/5 the length of the spring.  

* @property {number} freq Calculates the frequency based on the spring constant k and the mass of the block m. 
* @property {p5.Vector} equilibrium The equilibrium point.
* @property {p5.Vector} displacement The magnitude of displacement.
* @property {p5.Vector} velocity The velocity.
* @property {p5.Vector} acceleration The acceleration.
* @property Spring.update() {method} Updates the Spring object.
* @property Spring.display() {method} Displays the Spring object.
* @example
*function setup() {
*  createCanvas(500, 400);
*  spring = new Spring(createVector(10, height / 2), 100, 5, 250, 0.2, 0);
*}
*
*function draw() {
*  clear();
*  spring.update();
*  spring.display();
*}


*/

/*spring*/
function Spring(position, k, m, lengthOfSpring, oscAmp,mu) {
  boxsize = 70;
  //no of coils (purely decorative, odd numbers work better)
  this.noOfCoils = 11;
  //how long is the equilibrium length of the spring, in px
  this.lengthOfSpring = lengthOfSpring;
  //the transverse amplitude (also purely decorative)
  this.transAmp = 15;
  //time variables
  this.tzero = millis();
  this.time = 0;
  this.play = true;
  //get the starting position of the spring.
  this.xcent = position.x;
  this.ycent = position.y;
  //how do we want it? horizontal (theta = 0), vertical? (theta = PI/2)
  this.rotation = 0;
  //how big should the oscillation amplitude be? (as a fraction of the lengthOfSpring. i.e 0.5 means it will have an Amplitude equal to half the length of the spring, which is kinda long. 0.2 works good)
  this.oscAmp = oscAmp_;
  //calculate the frequency based on the spring constant k and the mass of the block m
  //The second term in the sqrt accounts for the change in freq due to mu
  this.freq = sqrt(k/m- sq(mu_)/(4*sq(m)));
  //friction coeff
  this.mu = mu;
  //Mass
  this.m = m;
  this.k = k;


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
  this.setPlay = function(play) {
    this.play=play;
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
