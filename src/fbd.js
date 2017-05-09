/**
* Makes a free-body diagram.
* @constructor FBD
* @param {p5.Vector} position The position vector.
* @param {number} howManyForces Choose how many forces to display. 
* @param {bool} showResultant Display the resulting net force.
* @param {object} options Pass in an object containing custom properties. (optional)
* @property {string} shape Choose the shape of the base. ('rect' or 'circle')
* @property {p5.Vector} shapeSize Customize the dimensions of the base shape. 
* @property {array} mag Array of numbers specifying the magnitude of each of the forces. 
* @property {array} direction Array of numbers specifying the direction of each of the forces. 
* @property {array} labels Array of strings specifying the labels for each of the forces.
* @property {array} offsets Array of numbers specifying the offset value for each of the forces arrows in pixels.
* @property {method}  FBD.display() Draws the FBD object.
* @property {method} FBD.update() Updates the FBD object.

* @example
* // creates a box FBD
* function setup() {
* 	canvas = createCanvas(500, 500);
* 	var bodyLocation = createVector(width / 3, height / 2);
* 	box_fbd = new FBD(bodyLocation, 3, true);
* 	box_fbd.mag = [175, 175, 75];
* 	box_fbd.direction = [0, -PI / 2, 0];
* }
*
* function draw() {
* 	box_fbd.update();
* 	box_fbd.display();
* }
*
* @example
* // creates a ball FBD
* function setup() {
* 	canvas = createCanvas(500, 500);
* 	var bodyLocation = createVector(width / 3, height / 4);
*   var options = { shape: 'circle' };
* 	ball_fbd = new FBD(bodyLocation, 2, true, options);
* 	ball_fbd.mag = [175, 175];
* 	ball_fbd.direction = [0, PI / 2];
* }
*
* function draw() {
* 	ball_fbd.update();
* 	ball_fbd.display();
* }
*
* @example
* // creates a ball FBD with some custom sizing and labels
* function setup() {
* 	canvas = createCanvas(500, 500);
* 	var bodyLocation = createVector(width / 3, height / 4);
*   var options = { shape: 'circle', 
		shapeSize: createVector(30,30),
        labels: [ 'Wind', 'Gravity'], 
		mag: [175, 175],
		direction: [0, PI / 2]		
       };
* 	ball_fbd = new FBD(bodyLocation, 2, true, options);
* }
*
* function draw() {
* 	ball_fbd.update();
* 	ball_fbd.display();
* }
*/

function FBD(position_, howManyForces_, showNetForce_, options_) {
  var defaultRed = color(230, 40, 40);
  this.position = position_;
  this.howManyForces = howManyForces_;
  this.showResultant = showNetForce_ || true;
  var options = options_ || {};
  this.shape = options.shape || "rect";
  this.shapeSize = options.shapeSize || createVector(20, 20);
  this.shapeColor = "black";
  this.netForceColor = "green";
  // generate long enough arrays to fill out the defaults if custom option not provided
  this.mag = options.mag || Array(this.howManyForces).fill(0);
  this.direction = options.direction || Array(this.howManyForces).fill(0);
  this.xoffsets = options.xoffsets || Array(this.howManyForces).fill(0);
  this.yoffsets = options.yoffsets || Array(this.howManyForces).fill(0);
  this.labels = options.labels || Array(this.howManyForces).fill("F");
  this.mainlabelxpadding = 15;
  this.mainlabelypadding = 0;
  this.minilabelxpadding = 15;
  this.minilabelypadding = 0;
  this.miniArrowColors =
    options.arrowColors || Array(this.howManyForces).fill(defaultRed);
  // displays the combined netForce vector
  this.mainArrowColor = options.netForceColor || defaultRed;
  this.miniArrowWidth = options.miniArrowWidth || 15;
  // forcesColor = defaultRed;
  v1 = [];
  if (this.showResultant) {
    resultant = new Arrow(position_, position_);
    resultant.color = this.mainArrowColor;
    resultant.grab = false;
    resultant.draggable = false;
  }

  for (var i = 0; i < this.howManyForces; i++) {
    v1[i] = new Arrow(
      position_,
      p5.Vector.add(
        position_,
        createVector(
          this.mag[i] * cos(this.direction[i]),
          this.mag[i] * sin(this.direction[i])
        )
      )
    );
    v1[i].grab = false;
    v1[i].draggable = false;
    v1[i].color = this.miniArrowColors[i];
    v1[i].width = this.miniArrowWidth;
  }
  this.update = function() {
    temp1 = createVector(0, 0);
    for (var i = 0; i < this.howManyForces; i++) {
      v1[i].origin = this.position;
      v1[i].target = p5.Vector.add(
        this.position,
        createVector(
          this.mag[i] * cos(this.direction[i]),
          this.mag[i] * sin(this.direction[i])
        )
      );
      temp1.add(p5.Vector.sub(v1[i].target, v1[i].origin));
      v1[i].update();
    }
    if (this.showResultant) {
      resultant.origin = this.position;
      resultant.target = p5.Vector.add(this.position, temp1);
      resultant.update();
    }
  };

  this.display = function() {
    for (var i = 0; i < this.howManyForces; i++) {
      fill(0);
      push();
      translate(this.xoffsets[i], this.yoffsets[i]);
      v1[i].display();
      pop();
    }
    for (var i = 0; i < this.howManyForces; i++) {
      push();
      translate(this.xoffsets[i], this.yoffsets[i]);
      text(
        this.labels[i],
        this.minilabelxpadding + v1[i].target.x,
        this.minilabelypadding + v1[i].target.y,
        100,
        100
      );
      pop();
    }
    if (this.showResultant) {
      if (temp1.mag() > 0.0001) {
        text(
          "Net Force",
          this.mainlabelxpadding + resultant.target.x,
          this.mainlabelypadding + resultant.target.y,
          100,
          100
        );

        resultant.display();
      }
    }
    // draw the object
    push();
    fill(this.shapeColor);
    if (this.shape == "rect") {
      rectMode(CENTER);
      rect(
        this.position.x,
        this.position.y,
        this.shapeSize.x,
        this.shapeSize.y
      );
    } else if (this.shape == "circle") {
      ellipse(
        this.position.x,
        this.position.y,
        this.shapeSize.x,
        this.shapeSize.y
      );
    }
    pop();
  };
}
