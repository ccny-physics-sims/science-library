/**
* Makes a little ball that can move and adheres to proper kinematics.
* @constructor KineticMass
* @param {p5.Vector} position A vector object describing the balls acceleration.
* @param {p5.Vector} velocity A vector object describing the ball's velocity.
* @param {p5.Vector} acceleration A vector object describing the ball's acceleration.
* @param {number} mass A scalar quantity indicating the mass.
* @param {color} color The color of the ball.
* @property {number} limit This sets the limit for the maximum speed. (default: 10000)
* @property {bool} tail Displays a tail of little dots that trail behind the KineticMass as it moves.
* @property {color} outline The color of the KineticMass object. 
* @property {number} tailLength The number of tailbits following the KineticMass object. (note: 70 is a good number)
* @property {color} tailFill The tail color. 
* @property {color} tailStroke Thickness of the tail stroke. 
* @property {number} tailSpacing How many frames to skip before leaving a tailbit. 
* @example
* function setup() {
*  //make a position vector
*  pos = createVector(width/2,height/2)
*  // make a velocity vector (5 px/fr in x, 2 px/fr in y)
*  vel = createVector(5,2);
*  // no acceleration
*  accel = createVector(0,0);
*  // create the ball. Give it a mass of 10, and let's make it red.
*  ball = new KineticMass(pos,vel,accl,10,'red');
* }
*
* function draw(){
*  // update the ball's parameters
*  ball.update();
*  //display changes
*  ball.display();
* }
@example
* function setup() {
*  //make a position vector
*  pos = createVector(width/2,height/2)
*  // make a velocity vector (5 px/fr in x, 2 px/fr in y)
*  vel = createVector(5,2);
*  // no acceleration
*  accel = createVector(0,0);
*  // create the ball. Give it a mass of 10, and let's make it red.
*  ball = new KineticMass(pos,vel,accl,10,'red');
* }
*
* function draw(){
*  // update the ball's parameters
*  ball.update();
*  //display changes
*  ball.display();
* }

*/


var KineticMass = function(position, velocity, acceleration, mass, kmFill) {
    this.position = new createVector(position.x, position.y);
    this.velocity = new createVector(velocity.x, velocity.y);
    this.acceleration = new createVector(acceleration.x, acceleration.y);
    this.previousVel = new createVector(0, 0);
    this.limit = 10000;
    this.mass = mass;
    //how does the mass look
    this.color = kmFill;
    this.outline = 255;
    //size is proportional to mass
    this.size = this.mass;

    // tail properties
    this.tail = false;
    this.tailFill = kmFill;
    this.tailStroke = kmFill;

    this.tailA = [];


    this.tailLength = 70;
    this.tailSpacing = 5;


    this.update = function() {
        if (this.tail === true && frameCount % this.tailSpacing == 0) {
            this.tailA.push(this.position.copy());
        }
        this.previousVel = this.velocity.copy();
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.limit);
        this.avgYVel = (this.previousVel.y + this.velocity.y) / 2;
        this.avgXVel = (this.previousVel.x + this.velocity.x) / 2;
        this.position.x += this.avgXVel;
        this.position.y += this.avgYVel;
        //this.acceleration.mult(0);


        if (this.tailA.length > this.tailLength) {
            this.tailA = this.tailA.slice(-1 * this.tailLength);
        }

        //handles angular momentum
        this.aVelocity += this.aAcceleration;
        this.angle += this.aVelocity;
    };

    this.display = function() {

        fill(this.color);
        stroke(this.outline);
        ellipse(this.position.x, this.position.y, this.size, this.size);

        if (this.tail === true) {
            push();
            for (var i = 0; i < this.tailA.length; i++) {
                stroke('rgba(' + red(color(this.tailStroke)) + ',' + green(color(this.tailStroke)) + ',' + blue(color(this.tailStroke)) + ',' + map(i, 0, this.tailA.length, 0, 1) + ')');
                fill('rgba(' + red(color(this.tailFill)) + ',' + green(color(this.tailFill)) + ',' + blue(color(this.tailFill)) + ',' + map(i, 0, this.tailA.length, 0, 1) + ')');
                ellipse(this.tailA[i].x, this.tailA[i].y, 3, 3);
            }
            pop();
        }


    };

    this.giveItAnAcceleration = function(accel) {
        this.acceleration = (accel);
    }

    this.applyForce = function(force) {
        var f = force.copy();
        f.div(this.mass);
        this.acceleration = f;
    };
    //Behaviors
    this.wrapEdges = function() {

        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }

        if (this.position.y > height) {
            this.position.y = 0;
        } else if (this.position.y < 0) {
            this.position.y = height;
        }
    };
    this.wrapEdgesBounceFloor = function() {
        if (this.position.x > width) {
            this.position.x = 0;
        } else if (this.position.x < 0) {
            this.position.x = width;
        }
        if (this.position.y > height - this.size / 2) {
            overiny = this.position.y - height + this.size / 2;
            vatheight = Math.sqrt(Math.pow(this.velocity.y, 2) - 2 * this.acceleration.y * overiny);
            this.position.y = height - this.size / 2;
            this.velocity.y = -1 * vatheight;
        }
    }
    this.bounceEdges = function() {
        if (this.position.x < 0 + this.size / 2) {
            overinx = this.position.x - this.size / 2;
            vatwidth = Math.sqrt(Math.pow(this.velocity.x, 2) - 2 * this.acceleration.x * overinx);
            this.velocity.x = 1 * vatwidth;
            this.position.x = 0 + this.size / 2;

        }
        if (this.position.x > width - this.size / 2) {
            overinx = this.position.x - width + this.size / 2;
            vatwidth = Math.sqrt(Math.pow(this.velocity.x, 2) - 2 * this.acceleration.x * overinx);
            this.position.x = width - this.size / 2;
            this.velocity.x = -1 * vatwidth;
        }

        if (this.position.y < 0 + this.size / 2) {
            overiny = this.position.y - this.size / 2;
            vatheight = Math.sqrt(Math.pow(this.velocity.y, 2) - 2 * this.acceleration.y * overiny);
            this.velocity.y = 1 * vatheight;
            this.position.y = 0 + this.size / 2;

        }
        if (this.position.y > height - this.size / 2) {
            overiny = this.position.y - height + this.size / 2;
            vatheight = Math.sqrt(Math.pow(this.velocity.y, 2) - 2 * this.acceleration.y * overiny);
            this.position.y = height - this.size / 2;
            this.velocity.y = -1 * vatheight;
        }
    };

    this.towardMouse = function(a) {
        var mouse = new Vector(mouseX, mouseY);
        var dir = Vector.sub(mouse, this.position);
        dir.normalize();
        dir.mult(a);
        this.acceleration = dir;
    };

}


KineticMass.prototype.get = function() {
    var bob = new KineticMass(this.position, this.velocity, this.acceleration);
    return bob;
};
KineticMass.get = function(m) {
    var bob = new KineticMass(m.position, m.velocity, m.acceleration);
    return bob;
};
