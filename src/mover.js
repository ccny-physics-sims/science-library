/**
 * Makes a little ball that can move. This object is to be replaced by KineticMass
 * @constructor Mover
 * @param {p5.Vector} position The Mover's position.
 * @param {p5.Vector} velocity The Mover's velocity.
 * @param {p5.Vector} acceleration The Mover's acceleration.
 * @param {number} mass A scalar quantity indicating the mass.
 * @param {color} color The color of the Mover. 
 * @param {object} options Customize the default properties. (Optional.)
 * @property {number} limit The maximum speed of the mover.
 * @property {bool} tail A tail leaves little dots behind as it moves.
 * @property {number} size Default is set equivalent to mass. 
 * @property {color} outline The color of the KineticMass' outline. 
 * @property {bool} tail A tail leaves little dots behind as it moves.
 * @property {color} tailFill The color of the tail. (default: white)
 * @property {color} tailStroke The color of the tail's outline.
 * @property {number} a Angle. (default: 0)
 * @property {number} aVelocity Angular velocity. (default: 0)
 * @property {number} aAcceleration Angular acceleration. (default: 0)
 * @property {method} Mover.update() Update the Mover.
 * @property {method} Mover.display() Display the Mover. 
 * @property {method} Mover.giveItAnAcceleration() Give the Mover an acceleration.
 * @property {method} Mover.applyForce() Apply a force to the Mover.
 * @property {method} Mover.wrapEdges() If the Mover goes off the side of the screen, it will reappear on the opposite side. 
 * @property {method} Mover.bounceEdges() Bounces the Mover off the edges of the canvas. 
 * @property {method} Mover.towardMouse() Make the Mover attracted to the user's mouse. 
 * @deprecated
 */



var Mover = function(position, velocity, acceleration, mass, color, options) {
    this.options = options || {};
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
    this.tailFill = 'white';
    this.tailStroke = 'black';
    this.tailA = [];
    //sets up angular variables for rotations
    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = 0;



    this.update = function() {
        if (this.tail === true) {
            this.tailA.push(this.position.copy());
        }

        this.velocity.add(this.acceleration);
        this.velocity.limit(this.limit);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        var hCut = 70;
        if (this.tailA.length > hCut) {
            this.tailA = this.tailA.slice(-1 * hCut);
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
            fill(this.tailFill);
            stroke(this.tailStroke);
            for (var i = 0; i < this.tailA.length; i++) {
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
        this.acceleration.add(f);
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

    this.bounceEdges = function() {
        if (this.position.x < 0 + this.size / 2) {
            this.velocity.x *= -1;
            this.position.x = 0 + this.size / 2;

        }
        if (this.position.x > width - this.size / 2) {
            this.velocity.x *= -1;
            this.position.x = width - this.size / 2;
        }

        if (this.position.y < 0 + this.size / 2) {
            this.velocity.y *= -1;
            this.position.y = 0 + this.size / 2;

        }
        if (this.position.y > height - this.size / 2) {
            this.velocity.y *= -1;
            this.position.y = height - this.size / 2;
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


Mover.prototype.get = function() {
    var bob = new Mover(this.position, this.velocity, this.acceleration);
    return bob;
};
Mover.get = function(m) {
    var bob = new Mover(m.position, m.velocity, m.acceleration);
    return bob;
};
