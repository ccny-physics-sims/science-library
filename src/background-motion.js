/**
* Creates a moving background.
* @constructor MovingBackground
* @param {string} whichKind Options: 'cityStreet' or 'clouds'
* @param {p5.Vector} position The position vector.
* @param {p5.Vector} initialVelocity The initial velocity.
* @param {p5.Vector} acceleration The acceleration.
* @property {array} shapes Array containing the randomly generated city buildings or clouds. 
* @property {p5.Vector} avgVel The average velocity.
* @property MovingBackground.display() {method} Displays the MovingBackground object
* @property MovingBackground.update() {method} Updates the MovingBackground object
* @example 
* // creates a cityscape
*function setup() {
*  canvas = createCanvas(500, 500);
*  accelSlider = createSlider(-100, 100, 0);
*  accelSlider.position(20, 60);
*  velocity = createVector(0, 0);
*  acceleration = createVector(0, 0);
*  basePosition = createVector(0, 200);
*  bg = new movingBackground("cityStreet", basePosition, velocity, acceleration);
*}
*
*function draw() {
*  clear();
*  bg.acceleration = createVector(-accelSlider.value() / 1000, 0);
*  bg.update();
*  bg.display();
*}
* @example 
* // creates a cloudscape
*function setup() {
*  canvas = createCanvas(500, 500);
*  accelSlider = createSlider(-100, 100, 0);
*  accelSlider.position(20, 60);
*  velocity = createVector(0, 0);
*  acceleration = createVector(0, 0);
*  basePosition = createVector(0, 200);
*  bg = new movingBackground("clouds", basePosition, velocity, acceleration);
*}
*
*function draw() {
*  clear();
*  bg.acceleration = createVector(-accelSlider.value() / 1000, 0);
*  bg.update();
*  bg.display();
*}
*/
var options = { maxHeight: 300 };

var movingBackground = function(
  whichKind,
  position,
  initialVelocity,
  acceleration,
  options
) {
  options = options || {};
  this.maxBuildingHeight = (typeof options.maxBuildingHeight !== 'undefined') ? options.maxBuildingHeight : 100;
    this.amountOfBuildings = (typeof options.amountOfBuildings !== 'undefined') ?  options.amountOfBuildings : width/14 ; //(5 * width / 70);
        this.amountOfClouds = (typeof options.amountOfClouds !== 'undefined') ? options.amountOfClouds : width/5 ; // (2 * width/10)
  this.position = position;
  this.velocity = initialVelocity;
  this.acceleration = acceleration;
  this.whichKind = whichKind;
  this.shapes = [];
  this.avgVel = createVector(0, 0);
  if (this.whichKind == "cityStreet") {
    noOfBuildings = this.amountOfBuildings;
    rectMode(CORNERS);
    for (i = 0; i < noOfBuildings; i++) {
      this.shapes.push(
        new backgroundShape(this.whichKind, this.velocity, this.maxBuildingHeight)
      );
      this.shapes[i].position = createVector(
        -(width * 2) + i * 70, // 70?
        this.position.y
      );
      this.shapes[i].name = "bldg " + i;
      this.shapes[i].layer = i;
      this.shapes[i].scale = 3;
    }
  }

  if (this.whichKind == "clouds") {
    noOfClouds = this.amountOfClouds; 
    for (i = 0; i < noOfClouds; i++) {
      this.shapes.push(new backgroundShape(this.whichKind, this.velocity));
      this.shapes[i].position = createVector(
        random(-width, 2 * width),
        random(-height, 2 * height)
      );
      this.shapes[i].name = "cloud " + i;
      this.shapes[i].layer = i;
      this.shapes[i].scale = 2;
    }
  }

  this.l = this.shapes.length;
  this.update = function() {
    this.oldVelocity = this.velocity;
    this.velocity.add(this.acceleration);
    this.avgVel.x = this.oldVelocity.x + this.velocity.x * 0.5;
    this.avgVel.y = this.oldVelocity.y + this.velocity.y * 0.5;
  };

  this.display = function() {
    for (i = this.l - 1; i >= 0; i--) {
      this.shapes[i].run();
    }
  };
};

var backgroundShape = function(whichKind, velocity, maxHeight) {
  this.howTall = random(40, maxHeight);
  this.howWide = random(20, 100);
  this.fill = random(60, 230);
  this.whichKind = whichKind;
  this.avgVel = velocity;
  this.run = function() {
    this.needsMoving();
    this.update();
    //only display the ones near the canvas
    if (
      this.position.x < width + 100 &&
      this.position.x > -100 &&
      this.position.y > -100 &&
      this.position.y < height + 100
    ) {
      this.display();
    }
  };

  this.update = function() {
    if (this.whichKind == "cityStreet") {
      rectMode(CORNERS);
      this.position.add(this.avgVel);
    } else if (this.whichKind == "clouds") {
      this.position.add(
        p5.Vector.mult(this.avgVel, (noOfClouds - this.layer) / noOfClouds)
      );
    }
  };

  this.display = function() {
    if (this.whichKind == "cityStreet") {
      push();
      fill(this.fill);
      noStroke();
      rect(
        this.position.x,
        this.position.y,
        this.position.x + this.howWide,
        this.position.y - this.howTall
      );
      // text(this.name,this.position.x,this.position.y+40) 
      // (above labels buildings for debugging)
      pop();
      push();
      stroke(0);
      line(0, this.position.y, width, this.position.y);
      pop();
    } else if (this.whichKind == "clouds") {
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
    if (this.position.x > width * this.scale) {
      this.position.x = -width * (this.scale - 1);
    }
    if (this.position.y < -(height * (this.scale - 1))) {
      this.position.y = height * this.scale;
    }
    if (this.position.y > height * this.scale) {
      this.position.y = -height * (this.scale - 1);
    }
  };
};

