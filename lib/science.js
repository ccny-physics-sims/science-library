/*! science-sims - v0.1.0 - 2017-06-30 */ 
/**

* @constructor Arrow

 * @description  Draws an arrow from one point to another. Useful for vector diagramming.
* @param {p5.Vector} origin A vector object describing the origin
* @param {p5.Vector} target A vector object describing the end point
* @param {object} options Customize the default properties. (Optional.)
* @property {bool} grab Indicates if the Arrow is grabbable. (default: true)
* @property {bool} draggable Indicates if the Arrow is draggable. (default: true)
* @property {bool} showComponents Controls the visibility of the Arrow's components. (default: false)
* @property {color} color The color of the Arrow. (default: black)
* @property {bool} selected Indicates if the Arrow is currently selected. (default: false)
* @property {bool} dragSelected Indicates if the Arrow is currently selected and dragged. (default: false)
* @property {bool} isDragging Indicates if the Arrow is currently being dragged. (default: false)
* @property {number } width Thickness of the Arrow. (default: 20px)
* @property Arrow.display() {method} Displays the Arrow object.
* @property Arrow.update() {method} Updates the Arrow object.

* @example

* function setup() {
*   createCanvas(500, 500);
*   startPoint = createVector(0, 0);
*   endPoint = createVector(100, -100);
*   myArrow = new Arrow(startPoint, endPoint);
*   // center the arrow at the origin
*   translate(width / 2, height / 2);
*   myArrow.display();
* }
*/

var somethingIsDragging;

function Arrow(origin, target, options) {
    var options = options || {};
    this.origin = origin.copy();
    this.target = target.copy();

    //control handles
    this.grab = typeof options.grab !== 'undefined' ? options.grab : true;
    this.draggable = typeof options.draggable !== 'undefined' ? options.grabbable : true;
    this.showComponents = typeof options.showComponents !== 'undefined' ? options.showComponents : false;
    this.color = typeof options.color !== 'undefined' ? options.color : color('rgb(255,255,255)');
    this.selected = typeof options.selected !== 'undefined' ? options.selected : false;
    this.dragSelected = typeof options.dragSelected !== 'undefined' ? options.dragSelected : false;
    this.isDragging = typeof options.isDragging !== 'undefined' ? options.isDragging : false;
    this.width = typeof options.width !== 'undefined' ? options.width : 20;

    //mouse old coordinates for translation
    this.oldX = 0;
    this.oldY = 0;

    this.display = function() {
        push();
        fill(this.color);
        noStroke();
        var d = dist(this.origin.x, this.origin.y, this.target.x, this.target.y);
        var w = this.width;
        translate(this.origin.x, this.origin.y);
        var angle = angCalc(this);

        rotate(angle);

        //draw arrow
        if (this.boundChk() && this.draggable == true) {
            fill(red(this.color) + (255 - red(this.color)) / 2, green(this.color) + (255 - green(this.color)) / 2, blue(this.color) + (255 - blue(this.color)) / 2);

        }
        if (this.isDragging == true) {
            fill(red(this.color) + (255 - red(this.color)) / 2, green(this.color) + (255 - green(this.color)) / 2, blue(this.color) + (255 - blue(this.color)) / 2);
        }
        drawArrow(w, d, this);
        pop(); //reset drawing state

        //draw components if requested
        if (this.showComponents === true) {
            push();
            strokeWeight(2);
            stroke(this.color);
            textSize(18);
            line(this.origin.x, this.origin.y, this.target.x, this.origin.y);
            line(this.origin.x, this.origin.y, this.origin.x, this.target.y);
            pop();
            push();
            fill(0);
            text("y: " + (Math.round(-1 * (this.target.y - this.origin.y))).toString(), this.origin.x, this.target.y);
            text("x: " + (Math.round(this.target.x - this.origin.x)).toString(), this.target.x, this.origin.y);
            pop();
        }

    };
    this.update = function() {
        if (somethingIsDragging) {
            this.selected = true;
        }
        if (this.selected) {

            this.target.x = mouseX;
            this.target.y = mouseY;
        } else if (this.dragSelected) {

            if (this.oldX !== mouseX && this.oldX !== 0) {

                this.target.x += mouseX - this.oldX;
                this.origin.x += mouseX - this.oldX;
            }

            if (this.oldY !== mouseY && this.oldY !== 0) {
                this.target.y += mouseY - this.oldY;
                this.origin.y += mouseY - this.oldY;
            }

            this.oldX = mouseX;
            this.oldY = mouseY;

        }
    };


    this.boundChk = function() {

        // get distance from the point to the two ends of the line
        var d1 = dist(mouseX, mouseY, this.origin.x, this.origin.y);
        var d2 = dist(mouseX, mouseY, this.target.x - 2, this.target.y - 2);

        // get the length of the line
        var lineLen = dist(this.origin.x, this.origin.y, this.target.x - 2, this.target.y - 2);
        buffer = 2;

        if (buffer === undefined) {
            buffer = 1;
        } // higher # = less accurate

        // if the two distances are equal to the line's length, the point is on the line!
        // note we use the buffer here to give a range, rather than one #

        if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
            return true;
        }
        return false;
    };

}


function drawArrow(thickness, length, arrow) {
    //draw the arrow itself
    translate(0, -thickness / 2);
    // rect(0, thickness/4, length, thickness/2);
    // triangle(length, 0, length, thickness, length+15, thickness/2);
    rect(0, thickness / 4, length - 8, thickness / 2);
    triangle(length - 8, 0, length - 8, thickness, length + (thickness / 2), thickness / 2);
    //draw handle
    if (arrow.grab === true) {
        var d = dist(arrow.target.x, arrow.target.y, mouseX, mouseY);
        if (d < 6) {
            fill(40, 40);
            strokeWeight(1);
            stroke('black');
            ellipse(length, thickness / 2, arrow.width * 1.5, arrow.width * 1.5);
            if (mouseIsPressed) {
                arrow.selected = true;
                fill(255, 255, 0, 150);
                arrow.isDragging = true;
            } else {
                arrow.selected = false;
                arrow.isDragging = false;
                fill(255, 255, 255, 200);
            }

        } else {
            noFill();
        }

        //strokeWeight(2);
        //stroke(arrow.color);
        //ellipse(length,thickness/2, 12,12);

        //drag handle
        if (arrow.draggable === true) {


            if (arrow.boundChk()) {
                if (mouseIsPressed) {

                    arrow.dragSelected = true;
                    arrow.isDragging = true;
                    somethingIsDragging = true;
                    if (!arrow.isDragging) {
                        if (somethingIsDragging) {
                            arrow.oldX = arrow.oldX;
                            arrow.oldY = arrow.oldY;
                        }
                    } else {
                        arrow.oldX = mouseX;
                        arrow.oldY = mouseY;
                        fill(255, 255, 0, 100);
                    }
                } else {
                    arrow.dragSelected = false;
                    arrow.isDragging = false;
                    somethingIsDragging = false;
                    fill(255, 255, 255, 100);
                    this.oldX = 0;
                    this.oldY = 0;
                }

            } else {
                noFill();
            }


            if (arrow.selected && arrow.dragSelected) {
                arrow.dragSelected = false;
            }

        }
    }


}


function angCalc(arrow) {
    //angleMode(DEGREES);
    return atan2(arrow.target.y - arrow.origin.y, arrow.target.x - arrow.origin.x);
};

/**
* Makes a little ball that can move and adheres to proper kinematics.
* @constructor KineticMass
* @param {p5.Vector} position A vector object describing the balls acceleration.
* @param {p5.Vector} velocity A vector object describing the ball's velocity.
* @param {p5.Vector} acceleration A vector object describing the ball's acceleration.
* @param {number} mass A scalar quantity indicating the mass.
* @param {color} color The color of the ball.
* @param {object} options Customize the default properties. (Optional.)
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


var KineticMass = function(position, velocity, acceleration, mass, kmFill, options) {
    this.options = options || {};
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

/**
* Creates a Spring object. Consists of a spring with a block attached to the end. 
* @constructor Spring
* @param {p5.Vector} position The origin of the Spring. 
* @param {number} k Spring coefficient.
* @param  {number} m Mass of the block attached to the spring.
* @param  {number} lengthOfSpring Length of the Spring in px.
* @param  {number} oscAmp Amplitude of the oscillation.
* @param  {number} mu Coefficient of friction.
* @param {object} options Customize the default properties. (Optional.)

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

function Spring(position, k, m, lengthOfSpring, oscAmp, mu, options) {
    var options = options || {};
    this.boxsize = (typeof options.boxsize !== 'undefined') ? options.boxsize : 70;
    // purely decorative, odd numbers work better
    this.noOfCoils = (typeof options.noOfCoils !== 'undefined') ? options.noOfCoils : 11;
    //  equilibrium length of the spring in px
    this.lengthOfSpring = lengthOfSpring;
    //the transverse amplitude (also purely decorative)
    this.transAmp = 15;
    this.tzero = millis();
    this.time = 0;
    this.play = true;
    //get the starting position of the spring.
    this.xcent = position.x;
    this.ycent = position.y;
    //how do we want it? horizontal (theta = 0), vertical? (theta = PI/2)
    this.rotation = 0;
    // oscillation amplitude as a fraction of   lengthOfSpring. i.e 0.5 means it will have an Amplitude equal to half the length of the spring, which is kinda long. (0.2 works good)
    this.oscAmp = oscAmp;
    //calculate the frequency based on the spring constant k and the mass of the block m
    //The second term in the sqrt accounts for the change in freq due to mu
    this.freq = sqrt(k / m - sq(mu) / (4 * sq(m)));
    this.mu = mu;
    this.m = m;
    this.k = k;
    this.equilibrium = createVector(this.lengthOfSpring, 0);
    this.displacement = createVector(0, 0);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    //Function used to toggle animation
    this.setPlay = function(play) {
        this.play = play;
    }
    this.update = function() {
        //Keep track of time
        if (this.play) {
            //Animation is running so we update time
            this.time = millis() / 1000 - this.tzero;
        } else {
            //Animation pause "hold" time still
            this.tzero = millis() / 1000 - this.time;
        }
    }

    this.display = function() {
        push();
        //Calculate argument for sin and amplitude
        var theta = this.time * this.freq;
        var amp = this.oscAmp * exp((-1 * this.mu * this.time) / (2 * this.m));
        //Draw the mass at the end
        translate(this.xcent, this.ycent);
        rotate(this.rotation)
        fill(200);
        rect(this.lengthOfSpring - (this.boxsize / 2) + (this.lengthOfSpring - 60) * amp * sin(theta), -(this.boxsize / 2), this.boxsize, this.boxsize);
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
        this.displacement.x = this.equilibrium.x + ((this.lengthOfSpring - 60) * amp * sin(theta));
        //TODO: Multiply Velocity and acceleration vals by actual Amplitude for final result
        this.velocity.x = sqrt(this.k / this.m) * amp * cos(theta);
        this.acceleration.x = -this.k / this.m * (amp * sin(theta));

        pop();
    }
}

/**
* Creates a simple x-y axis.
* @constructor Axes
* @param {object} options Customize the default properties. (Optional)
* @property {object} styles The styles. 
* @property {color} lineColor The color of the lines. (default: black)
* @property {number} lineThickness The thickness of the lines. (default: 1px)
* @property {number} rotateBy Rotate axes by degrees or radians. (default: 0)
* @property {object} bounds Set the bounds of the axes. (default: { minX: 0, maxX: 500, minY: 0, maxY: 500 })
* @property {method} Axes.display() Displays the axes. 

* @example 
 
* function setup() {
*   createCanvas(500, 500);
*   myAxes = new Axes();
*   myAxes.display();
* }
 
* @example 
* function setup() {
*   createCanvas(500, 500);
*   var customSettings = {lineColor : 'blue', lineThickness : 5}
*   myAxes = new Axes(customSettings);
*   myAxes.display();
* }
*/

function Axes(options) {
    this.options = options || {};
    this.styles = typeof options.styles !== undefined ? options.styles : {};
    this.lineColor = (typeof this.lineColor !== "undefined") ?
        this.lineColor :
        "black";
    this.lineThickness = (typeof this.lineThickness !== "undefined") ?
        this.lineThickness :
        1;
    this.rotateBy = typeof options.rotateBy !== "undefined" ?
        options.rotateBy :
        0;
    this.bounds = typeof options.bounds !== "undefined" ?
        options.bounds : {
            minX: 0,
            maxX: 500,
            minY: 0,
            maxY: 500
        };
    // this doesn't work yet with origins that aren't smack in the middle
    this.origin = typeof options.origin !== "undefined" ?
        options.origin : {
            x: (this.bounds.minX + this.bounds.maxX) / 2,
            y: (this.bounds.minY + this.bounds.maxY) / 2
        };
    this.highlightOrigin = typeof options.highlightOrigin !== "undefined" ?
        options.highlightOrigin : {
            on: false
        };
    if (this.highlightOrigin.on) {
        this.highlightOrigin.fillColor = (typeof options.highlightOrigin.fillColor !==
                "undefined") ?
            options.highlightOrigin.fillColor :
            "red";
        this.highlightOrigin.size = typeof options.highlightOrigin.size !==
            "undefined" ?
            options.highlightOrigin.size :
            10;
    }
    this.display = function() {
        push();
        rotate(this.rotateBy);
        stroke(this.styles.lineColor);
        strokeWeight(this.styles.lineThickness);
        line(
            this.bounds.maxX / 2,
            this.bounds.minY,
            this.bounds.maxX / 2,
            this.bounds.maxY
        );
        line(
            this.bounds.minX,
            this.bounds.maxY / 2,
            this.bounds.maxX,
            this.bounds.maxY / 2
        );
        pop();
        if (this.highlightOrigin.on) {
            push();
            translate(0, -this.bounds.minY);
            fill(this.highlightOrigin.fillColor);
            ellipse(this.origin.x, this.origin.y, this.highlightOrigin.size);
            pop();
        }
    };
}

/**
 * Creates a moving background.
 * @constructor MovingBackground
 * @param {string} whichKind Options: 'cityStreet' or 'clouds'
 * @param {p5.Vector} position The position vector.
 * @param {p5.Vector} initialVelocity The initial velocity.
 * @param {p5.Vector} acceleration The acceleration.
 * @param {object} options Customize the default properties. (Optional.)
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

var movingBackground = function(
    whichKind,
    position,
    initialVelocity,
    acceleration,
    options
) {
    options = options || {};
    this.maxUnitHeight = (typeof options.maxUnitHeight !== 'undefined') ? options.maxUnitHeight : 300;
    this.amountOfBuildings = (typeof options.amountOfBuildings !== 'undefined') ? options.amountOfBuildings : width / 14; //(5 * width / 70);
    this.amountOfClouds = (typeof options.amountOfClouds !== 'undefined') ? options.amountOfClouds : width / 5; // (2 * width/10)
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
                new backgroundShape(this.whichKind, this.velocity, this.maxUnitHeight)
            );
            this.shapes[i].position = createVector(-(width * 2) + i * 70, // 70?
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

var backgroundShape = function(whichKind, velocity) {
    this.howTall = random(40, this.maxUnitHeight);
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

/**
 * Makes a wheel that can display various forces while rotating or rolling.
 * @constructor Wheel
 * @param {number} x The x coordinate of the wheel's center.
 * @param {number} y The y coordinate of the wheel's center.
 * @param {number} d The wheel's diameter.
 * @property {array} arrowDecorations Customize the Arrow type and locations. Example: [{type: 'velocity', radialLocation: 1, rimPos: 0 }]
 * @property {array} arrows Array of Arrow objects to display on the wheel. 
 * @property {color} rimColor Color of the wheel rim. 
 * @property {color} spokeColor Color of the wheel spokes. 
 * @property {color} wheelColor Color of the rest of the wheel. 
 * @property {bool} rotate Allows the wheel to rotate. (default: false)
 * @property {num} angle Angle in radians.
 * @property {num} angularSpeed Angular speed.
 * @property {num} translationalSpeed Translational speed.
 * @property {method} Wheel.addDecorations(decorations) Draws Arrow objects to indicate vectors. 
 * @property {method} Wheel.wrap()  The wheel will reappear on the other side of the canvas. 
 * @property {method} Wheel.draw()  Draw the Wheel object.
 * @property {method} Wheel.update()  Update the Wheel object.
 * @example 
 * //  A wheel that rolls along the ground
 * function setup() {
 *  canvas = createCanvas(600, 500);
 *  wheel = new Wheel(width / 2, height / 2, 200);
 *  wheel.rotate = true;
 *  wheel.translationalSpeed = 4;
 * }
 *
 * function draw() {
 *  clear();
 *  drawScenery();
 *  wheel.update();
 *  wheel.wrap();
 *  wheel.draw();
 * }
 *
 *function drawScenery() {
 *  background(221, 239, 254);
 *  push();
 *  noStroke(); 
 *  // draw the ground
 *  fill("grey");
 *  rect(0, wheel.y + wheel.r, width, height);
 *  pop();
 *}
 * @example 
 * // A wheel that skids along the ground
 * function setup(){
 *   createCanvas(600,500);
 *   wheel = new Wheel(width/4, height/2, 200);
 *   wheel.rotate = false;
 *   wheel.translation = true;
 *   wheel.translationalSpeed = 2;
 * }
 * function draw(){
 *  drawScenery();
*   wheel.update();
*   wheel.wrap();
*   wheel.draw();   
 * }
 * function drawScenery() {
 *  background(221, 239, 254);
 *  push();
 *  noStroke(); 
 *  // draw the ground
 *  fill("grey");
 *  rect(0, wheel.y + wheel.r, width, height);
 *  pop();
 * }
 * @example 
*  // A wheel on a rainy day
* function setup() {
*   canvas = createCanvas(600, 500);
*   options = {specialEffects: {active: true, style: "splash" }}
*   wheel = new Wheel(width / 2, height / 2, 200, options);
*   wheel.rotate = true;
*   wheel.translationalSpeed = 4;
* }
* 
* function draw() {
*   clear();
*   wheel.update();
*   wheel.wrap();
*   wheel.draw();
* }
 
 */

//TODO: wheel object for rotating.
//TODO: make a smart rotate that rotates and moves along
//the ground at the correct (non-slipping) speed.
//TODO trying to add water spraying out from the "slipping"
//wheel so that it looks more realistic. The code for it so far
//has been commented out. (need the correct js library as well as
//tweaking the values of the code to make it work).
//TODO download correct particle lib not grafica!!!
// 05/17 Note from C - I have added some basic splashes in

var Wheel = function(x, y, d, options) {
    angleMode(RADIANS);
    var options = options || {};
    this.x = x;
    this.y = y;
    this.r = d / 2; //radius
    this.d = d; // diameter
    this.arrowDecorations = [];
    this.arrows = [];
    this.rimColor = color("rgba(0,0,0,1)");
    this.spokeColor = color("rgba(0,0,0,1)");
    this.wheelColor = color("rgba(0,0,0,.1)");

    this.specialEffects = (typeof options.specialEffects !== 'undefined') ?
        options.specialEffects : {
            active: false,
            style: "splash"
        };
    if (this.specialEffects.active) {
        if (this.specialEffects.style == "splash")
            this.specialEffects.system = new ParticleSystem(
                createVector(-this.r / 4, this.r)
            );
    }
    //rotation variables
    this.rotate = false;
    this.angle = 0;
    this.angularSpeed = 0;

    //translation variables
    this.translationalSpeed = 0;

    //decorations for wheel
    this.vdecorate = false;
    this.cdecorate = false;

    //arrow vectors to display(not implemented)
    this.translation = false;
    this.rotation = false;
    this.rollingNoSlip = false;

    //actual arrow objects (only requires 3 to
    //display all of the modes)
    var orig = createVector(this.x, this.y);
    var temp = createVector(this.x + this.r, this.y - this.r);
    this.a1 = new Arrow(orig, temp);
    this.a2 = new Arrow(orig, temp);
    this.a3 = new Arrow(orig, temp);

    this.a1.width = 10;
    this.a2.width = 10;
    this.a3.width = 10;

    this.a1.color = color("green");
    this.a2.color = color("green");
    this.a3.color = color("green");

    this.a1.draggable = false;
    this.a1.grab = false;
    this.a2.draggable = false;
    this.a2.grab = false;
    this.a3.draggable = false;
    this.a3.grab = false;
    //arrow display options
    //-> static/relative
    this.addDecorations = function(decorations) {
        for (i = 0; i < this.arrowDecorations.length; i++) {
            this.arrows[i] = new Arrow(
                createVector(0, this.arrowDecorations[i].radialLocation * this.r),
                createVector(
                    25 *
                    (this.angularSpeed + this.translationalSpeed) *
                    this.arrowDecorations[i].radialLocation,
                    this.arrowDecorations[i].radialLocation * this.r
                )
            );
            this.arrows[i].color = color("green");
            this.arrows[i].width = 10;
            this.arrows[i].draggable = false;
            this.arrows[i].grab = false;
        }
    };
    this.wrap = function() {
        if (this.x - this.r > width) this.x = -this.r;
        if (this.x + this.r < 0) this.x = width + this.r;
    };
    this.update = function() {
        this.x += this.translationalSpeed; // spins in place if disabled
        this.angularSpeed = this.translationalSpeed / (this.r - this.r * 0.1);
    };
    this.draw = function() {
        push();
        angleMode(RADIANS);
        translate(this.x, this.y);
        // add special effects like splashes or etc...currently just splashes
        if (this.specialEffects.active == true) {
            this.specialEffects.system.addParticle();
            this.specialEffects.system.display();
        }
        //manage the rotation if this.rotate == true
        if (this.rotate == true) {
            rotate(this.angle);
            this.angle += this.angularSpeed;
            //if(this.angle >= 2*Math.PI) this.angle = 0;
        }
        //draw the circles
        fill(this.wheelColor);
        stroke(this.rimColor);
        strokeWeight(this.r * 0.1);
        ellipse(0, 0, this.d, this.d);

        // fill(color('rgba(200, 200, 200, .9)'));
        // ellipse(0,0,this.d*0.85,this.d*0.85);
        // fill(10);
        // ellipse(0,0,this.d*0.05,this.d*0.05);

        //draw the spokes of the wheel
        stroke(this.spokeColor);
        strokeWeight(2);
        for (var i = 0; i < 16; i++) {
            line(
                0,
                0,
                (this.r - 2) * cos(Math.PI / 6 * i),
                (this.r - 2) * sin(Math.PI / 6 * i)
            );
        }

        //..............................
        // draw the decorations if any
        //..............................

        for (i = 0; i < this.arrowDecorations.length; i++) {
            push();
            rotate(this.arrowDecorations[i].rimPos);
            this.arrows[i].target.x = -25 *
                (this.angularSpeed * this.r -
                    this.translationalSpeed *
                    Math.cos(-this.arrowDecorations[i].rimPos + this.angle)) *
                this.arrowDecorations[i].radialLocation;
            this.arrows[i].target.y =
                this.arrowDecorations[i].radialLocation * this.r -
                25 *
                (this.translationalSpeed *
                    Math.sin(-this.arrowDecorations[i].rimPos + this.angle));
            this.arrows[i].update();
            this.arrows[i].display();
            pop();
        }

        if (this.cdecorate == true) {
            //tire markers (ie. points A & B) for distance S
            //arc colors for length S
            stroke(255, 0, 0);
            strokeWeight(4);
            noFill();
            arc(0, 0, this.d, this.d, 0, Math.PI);
            stroke(0, 0, 255);
            arc(0, 0, this.d, this.d, Math.PI, 2 * Math > PI);
            //point colors
            noStroke();
            fill(255, 0, 0); //red for point A;
            ellipse(this.r, 0, 10, 10);
            fill(30, 30, 255); //blue for point B;
            ellipse(-this.r, 0, 10, 10);
        }
        pop();

        if (this.vdecorate == true) {
            //rotation vector
            if (this.rotation == true) {
                //a1 is the top right pointing arrow,
                //and a2 is the bottom left pointing
                //arrow.
                this.a1.origin.x = this.x;
                this.a1.origin.y = this.y - this.r;
                this.a1.target.x = this.x + 25 * this.angularSpeed;
                this.a1.target.y = this.y - this.r;

                this.a2.origin.x = this.x;
                this.a2.origin.y = this.y + this.r;
                this.a2.target.x = this.x - 25 * this.angularSpeed;
                this.a2.target.y = this.y + this.r;

                this.a1.update();
                this.a2.update();
                this.a1.display();
                this.a2.display();
            }
            //translation vector

            if (this.translation == true) {
                //a1 is the topmost arrow, a2 is the middle arrow
                //and a3 is the bottom arrow.
                this.a1.origin.x = this.x;
                this.a1.origin.y = this.y - this.r;
                this.a1.target.x = this.x + 25 * this.translationalSpeed;
                this.a1.target.y = this.y - this.r;

                this.a2.origin.x = this.x;
                this.a2.origin.y = this.y;
                this.a2.target.x = this.x + 25 * this.translationalSpeed;
                this.a2.target.y = this.y;

                this.a3.origin.x = this.x;
                this.a3.origin.y = this.y + this.r;
                this.a3.target.x = this.x + 25 * this.translationalSpeed;
                this.a3.target.y = this.y + this.r;

                this.a1.update();
                this.a2.update();
                this.a3.update();
                this.a1.display();
                this.a2.display();
                this.a3.display();
            }
        }
    };
};

/**
* Makes a free-body diagram.
* @constructor FBD
* @param {p5.Vector} position The position vector.
* @param {number} howManyForces Choose how many forces to display. 
* @param {object} options Customize the default properties. (Optional.)
* @property {string} shape Choose the shape of the base. ('rect' or 'circle')
* @property {p5.Vector} shapeSize Customize the dimensions of the base shape. 

* @property {bool} showNetForce Display the resulting net force.
* @property {array} mag Array of numbers specifying the magnitude of each of the forces. 
* @property {array} direction Array of numbers specifying the direction of each of the forces. 
* @property {array} labels Array of strings specifying the labels for each of the forces.
* @property {array} offsets Array of numbers specifying the offset value for each of the forces arrows in pixels.
* @property {method}  FBD.display() Draws the FBD object.
* @property {method} FBD.update() Updates the FBD object.

* @example
* // creates a box FBD
* function setup() {
*   canvas = createCanvas(500, 500);
*   var bodyLocation = createVector(width / 3, height / 2);
*   boxFBD = new FBD(bodyLocation, 3);
*   boxFBD.mag = [175, 175, 75];
*   boxFBD.direction = [0, -PI / 2, 0];
* }
*
* function draw() {
*   boxFBD.update();
*   boxFBD.display();
* }
*
* @example
* // creates a ball FBD
* function setup() {
*   canvas = createCanvas(500, 500);
*   var bodyLocation = createVector(width / 3, height / 4);
*   var options = { shape: 'circle' };
*   ballFBD = new FBD(bodyLocation, 2, options);
*   ballFBD.mag = [175, 175];
*   ballFBD.direction = [0, PI / 2];
* }
*
* function draw() {
*   ballFBD.update();
*   ballFBD.display();
* }
*
* @example
* // creates a ball FBD with some custom sizing and labels
* function setup() {
*   canvas = createCanvas(500, 500);
*   var bodyLocation = createVector(width / 3, height / 4);
*   var options = { 
      shape: 'circle', 
      shapeSize: createVector(30,30),
      labels: [ 'Wind', 'Gravity'], 
      mag: [175, 175],
      direction: [0, PI / 2]		
      };
*   ballFBD = new FBD(bodyLocation, 2, options);
* }
*
* function draw() {
*   ballFBD.update();
*   ballFBD.display();
* }
*/
function FBD(position, howManyForces, options) {
    var defaultRed = color(230, 40, 40);
    this.position = position;
    this.howManyForces = howManyForces;
    var options = options || {};
    this.showNetForce = (typeof options.showNetForce !== 'undefined') ? options.showNetForce : true;
    this.shape = (typeof options.shape !== 'undefined') ? options.shape : "rect";
    this.shapeSize = (typeof options.shapeSize !== 'undefined') ? options.shapeSize : createVector(20, 20);
    this.shapeColor = (typeof options.shapeColor !== 'undefined') ? options.shapeColor : "black";
    this.netForceColor = (typeof options.netForceColor !== 'undefined') ? options.netForceColor : "green";
    // generate long enough arrays to fill out the defaults if custom option not provided
    this.mag = (typeof options.mag !== 'undefined') ? options.mag : Array(this.howManyForces).fill(0);
    this.direction = (typeof options.direction !== 'undefined') ? options.direction : Array(this.howManyForces).fill(0);
    this.xoffsets = (typeof options.xoffsets !== 'undefined') ? options.xoffsets : Array(this.howManyForces).fill(0);
    this.yoffsets = (typeof options.yoffsets !== 'undefined') ? options.yoffsets : Array(this.howManyForces).fill(0);
    this.labels = (typeof options.labels !== 'undefined') ? options.labels : Array(this.howManyForces).fill("F");
    this.mainlabelxpadding = 15;
    this.mainlabelypadding = 0;
    this.minilabelxpadding = 15;
    this.minilabelypadding = 0;
    this.miniArrowColors = (typeof options.arrowColors !== 'undefined') ? Array(this.howManyForces).fill(options.arrowColors) : Array(this.howManyForces).fill(defaultRed);
    // displays the combined netForce vector
    this.mainArrowColor = (typeof options.netForceColor !== 'undefined') ? options.netForceColor : defaultRed;
    this.miniArrowWidth = (typeof options.miniArrowWidth !== 'undefined') ? options.miniArrowWidth : 15;
    v1 = [];
    if (this.showNetForce) {
        resultant = new Arrow(this.position, this.position);
        resultant.color = this.mainArrowColor;
        resultant.grab = false;
        resultant.draggable = false;
    }

    for (var i = 0; i < this.howManyForces; i++) {
        v1[i] = new Arrow(
            this.position,
            p5.Vector.add(
                this.position,
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
        if (this.showNetForce) {
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
        if (this.showNetForce) {
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

/**
* Creates a Point that can be used with the Plot and Graph objects. 
* @constructor Point
* @param {number} x The x value. 
* @param {number} y The y value.  
* @property {method} Point.add(x,y) Add x, subtract y.
* @property {method} Point.getPoint(p5.Vector) Converts a p5.Vector into a Point object.
* @property {method} Point.fixChoord() Inverts the y axis so that positive is up not down. Allows Points to be compatible with p5.js. 

* @property {method} Point.makePix(xoff,yoff,scalex,scaley)  Convert choord to pixel position.
* @property {method} Point.getDist(Point,Point)  Takes in two Point objects and returns a new Point object whose x and y values are the respective x and y distances.

*/

//GLOBAL CONSTANTS
FR = 30; // must match the framerate of the draw function.

//Declaration for a point object to be used when graphing.
function Point(x, y) {
    //basic coordinate variables
    this.x = x;
    this.y = y;
}
Point.prototype.add = function(x, y) {
    this.x += x;
    this.y -= y;
};
//fixes the y choordinates to work with p5.js
Point.prototype.fixChoord = function() {
    if (this.y > 0) {
        this.y = this.y * -1; //inverts the y axis so that positive is up not down
    }
};
//inverts both choordinates
Point.prototype.invert = function() {
    this.y *= -1;
    this.x *= -1;
};
//convert choord to pixel position
Point.prototype.makePix = function(xoff, yoff, scalex, scaley) {

    this.fixChoord();
    this.x = this.x * scalex + xoff;
    this.y = this.y * scaley + yoff;

};
/*
 * input = takes in two point objects
 * output = returns a new point object
 * whose x and y coords are the respective x and y distances.
 * (basically using the point object like a vector)*/
Point.getDist = function(p1, p2) {
    var pFinal = new Point(0, 0);
    pFinal.x = Math.abs(p1.x - p2.x); //gets the x distance between points
    pFinal.y = Math.abs(p1.y - p2.y); //gets the y distance between points
    return pFinal;
};
Point.getPoint = function(p) {
    var point = new Point(p.x, p.y);
    return point;
};
//a function object for graphing functions
function Equation() {
    //not implemented
}

/**
* Takes an array of Point objects and creates a plot of speed, velocity, and acceleration. 
* @constructor Plot

* @param {array} pointArray Array of Point objects to plot. 
* @param {color} red Color for representing speed.
* @param {color} green Color for representing velocity.
* @param {color} blue Color for representing  acceleration.
* @param {number} weight The weight.
* @param {string} title Title of the graph.
* @property {array} data The array of Points to be plotted. (default: pointArray)
* @property {number} pointSize Size of the points. (default: 8px)
* @property {bool} drawData Draw the data. (default: true)
* @property {string} plotTitle Assign the title of the plot. 
* @property {bool} timeplot Decides if the time is plotted. (default: false) 

* @property {method} Plot.plot(Graph) Takes a Graph Object and returns a Plot. 
* @property {method} Plot.getUser() Get position of user's mouse. 
* @property {method} Plot.tpRecord(variable,Graph) Timeplotting function. 
* @property {method} Plot.getPointDist(Point,Point) Takes in two point objects and returns a new point object whose x and y values are the respective x and y distances.
* @property {method} Plot.fixChoord(scalex,scaley,origin) Takes a p5.Vector as origin and scales it according to scalex and scaley. 

* @example Graph plots the position of a ball that moves up and down. 
* var xarray = [];
* var yarray = [];
* ground = 451;
* var goUpButton;
* 
* function setup() {
*   running = true;
*   canvas = createCanvas(400,300);
*   frameRate(20);
*   onoff = createButton("Pause");
*   onoff.position(width-100,height/3 + 30);
*   onoff.class("sim-button blue slim");
*   onoff.mousePressed(turnonoff);
*   goUpButton = createButton("GO UP");
*   goUpButton.position(width-100,height/3+60);
*   goUpButton.class("sim-button blue slim");
*   goDownButton = createButton("GO DOWN");
*   goDownButton.position(width-100,height/3+90);
*   goDownButton.class("sim-button blue slim");
*   pos = createVector(width-150,ground)
*   vel = createVector(0,0);
*   accel = createVector(0,0);
*   ball = new KineticMass(pos,vel,accel,1,'red');
*   ball.outline = color('rgba(255, 0, 0, 1)');
*   ball.limit = 2000;
*   ball.tail = false;   
*   goUpButton.mousePressed(goUp);
*   goDownButton.mousePressed(goDown);
*   positionGraph = new Graph(250,250,0,5,-350,350,8);
*   positionGraph.showBorder = false;
* 	positionGraph.set_offset(20,00);
*   positionPlot = new Plot([],0,0,200,1);
*   positionPlot.pointSize = 1;
*   positionGraph.addPlot(positionPlot);
*   motion1 = new upMotion(ball);
*   motion1.goingUp = false;
* 
*   positionGraph.xlabel = "";
*   positionGraph.ylabel = "y";
*   positionGraph.title = "y vs. time"
* }
* 
* function draw() {
*   background(255);
*   motion1.advanceInTime();
*   ball.update();
*   ball.display();
*   positionGraph.drawBg(color(255),color(0));
*   positionGraph.plotAll();
*   //now during the draw function call these three functions
*   positionGraph.plots[0].tpRecord((ground-ball.position.y),positionGraph);
* }
* function goUp(){
*   if (ball.velocity.mag() < 0.001) {
*   motion1.goingUp = true;
*   motion1.t0 = frameCount
*   }
* 
* }
* function goDown(){
*   if (ball.velocity.mag() < 0.001) {
*   motion1.goingDown = true;
*   motion1.t0 = frameCount
* }
* }
* var upMotion = function(whatsMoving) {
*     this.who = whatsMoving;
*     this.t0 = frameCount;
*     this.goingUp = false;
*     this.advanceInTime = function() {
*       if(this.goingUp == true){
*       t=frameCount-this.t0;
*       if(t < 10){
*       this.who.acceleration.y = -.3;
*       }
*       if(t > 10 ){this.who.acceleration.y = 0;}
*       if(t > 50 ){this.who.acceleration.y = +.3;}
*       if(t > 60 ){this.who.acceleration.y = 0;}
*       if(t > 61){this.goingUp = false;}
*       }
*       if(this.goingDown == true){
*       t=frameCount-this.t0;
*       if(t < 10){
*       this.who.acceleration.y = +.3;
*       }
*       if(t > 10 ){this.who.acceleration.y = 0;}
*       if(t > 50 ){this.who.acceleration.y = -.3;}
*       if(t > 60 ){this.who.acceleration.y = 0;}
*       if(t > 61){this.goingDown = false;}
*       }
*     }
* }
* 
* function turnonoff() {
*   if (!running) {
*     running = true;
*     turnedOffByButton = false;
*     loop();
*     onoff.html("stop");
*     return
*   }
* 
*   if (running) {
*     running = false;
*     turnedOffByButton = true;
*     noLoop()
*     onoff.html("start");
*     return
*   }
* }
* 
* 





*/

/*Declaration of plot object which will be graphed
 * on graph object
 * */
function Plot(pointArray, red, green, blue, weight, title) {
    if (title === undefined) {
        title = "default";
    }
    this.data = pointArray; //plot data (an array of points)
    this.color = color(red, green, blue, title = "default"); //the color that the graph will be drawn in
    this.weight = weight; // a number for the stroke thickness of the graph
    this.pointSize = 8;
    this.drawData = true;
    this.plotTitle = title;
    this.timeplot = false;
}
//regular plotting function
Plot.prototype.plot = function(graph) {
    //set up the styles for what will be drawn
    fill(this.color);
    stroke(this.color);
    strokeWeight(this.weight);

    //draws the data points and the connecting lines
    for (var i = 0; i < this.data.length; i++) {

        if (i < this.data.length - 1 &&
            this.data[i + 1].x <= graph.tr_pix.x &&
            this.data[i + 1].y >= graph.tr_pix.y &&
            this.data[i].x >= graph.bl_pix.x &&
            this.data[i].y <= graph.bl_pix.y) {
            //if(i<this.data.length-1){
            //draws the connecting lines, scaling the data so that
            //it corresponds to our coordinate space
            line(this.data[i].x, this.data[i].y,
                this.data[i + 1].x, this.data[i + 1].y);
        }
        //draws the data points, with scaling and offset.
        if (this.data[i].x <= graph.tr_pix.x &&
            this.data[i].y >= graph.tr_pix.y &&
            this.data[i].x >= graph.bl_pix.x &&
            this.data[i].y <= graph.bl_pix.y) {
            ellipse(this.data[i].x, this.data[i].y, this.pointSize, this.pointSize);
        }

    }
};

//updates data to user input
Plot.prototype.getUser = function() {
    var d = new Point(0, 0);
    var pmouse = new Point(mouseX, mouseY);
    var closest = 100000;
    var closestIndex = 0;
    for (var i = 0; i < this.data.length; i++) {

        d = Point.getDist(pmouse, this.data[i]);
        if (closest > d.x) {
            closest = d.x;
            closestIndex = i;
        }
    }
    //TODO: add boundary limits to this funtion.
    this.data[closestIndex].y = mouseY;
};

//variable input doesn't seem to be used anywhere, not sure why it exists, but will leave it here for safety purposes
Plot.prototype.tpRecord = function(variable, graph) {
    this.timeplot = true;
    var bl = graph.bl_pix.x;
    var tr = graph.x_max;
    //var timescale = (tr-bl)/100;
    //var timescale = (graph.x_max-graph.x_min)/graph;
    var timescale = FR;
    for (var i = 0; i < this.data.length; i++) {
        this.data[i].x -= graph.xunit / timescale; //shift the x-axis
    }
    if (this.data[0] && this.data[0].x < bl) {
        this.data.splice(0, 1);
    }

    var p = new Point(tr, variable);
    this.data.push(p);

};
//gets distance between two points of data
Plot.prototype.getPointDist = function(num1, num2) {
    return dist(this.data[num1].x, this.data[num1].y,
        this.data[num2].x, this.data[num2].y);
};
Plot.prototype.fixChoord = function(scalex, scaley, origin) {
    var p = Point.getPoint(origin);
    for (var i = 0; i < this.data.length; i++) {
        //this.data[i].fixChoord();
        p.add(this.data[i].x * scalex, this.data[i].y * scaley);
        this.data[i].x = p.x;
        this.data[i].y = p.y;
        p = Point.getPoint(origin);
    }
};


/**
* Constructs a Graph. Plot objects consisting of Point objects can be added and displayed on the Graph. 

* @constructor Graph

* @param {number} w Width of the Graph.
* @param {number} h Height of the Graph.
* @param {number} x_min Smallest value of the x-axis.    
* @param {number} x_max Largest value of the x-axis. 
* @param {number} y_min Smallest value of the y-axis. 
* @param {number} y_max Largest value of the y-axis. 
* @param {number} resolution The resolution of the Graph. Determines tick intervals.

* @property {string} title Title of the graph. 
* @property {string} xlabel Caption for the x-axis. 
* @property {string} ylabel Caption for the y-axis. 
* @property {bool} showLabels Display the labels of the x and y axes. 
* @property {bool} showTitle Display the graph title. 
* @property {bool} showBorder Display a border around the graph. 
* @property {number} borderWidth Width of the border. (default: 2px) 
* @property {bool} showLegend Display a legend for the graph. (default: false)
* @property {number} xOffset Offset x by a number of pixels. (default: 0px) 
* @property {number} yOffset Offset y by a number of pixels. (default: 0px)
* @property {array} Plots An Array of Plot objects. 
* @property {method} Graph.update() Update the Graph. 
* @property {method} Graph.set_offset(xoff,yoff) Update the Graph's offset values. 
* @property {method} Graph.drawBg()  Draws the background.
* @property {method} Graph.addPlot(Plot)  Adds a Plot to the Graph.
* @property {method} Graph.plotAll() Draw all the Plots on the Graph. 
*/

function Graph(w, h, x_min, x_max, y_min, y_max, resolution) {
    // initial variables
    this.width = w;
    this.height = h;
    this.resolution = resolution;
    this.x_min = x_min;
    this.x_max = x_max;
    this.y_min = y_min;
    this.y_max = y_max;

    //styling variables
    this.title = "Title"
    this.xlabel = "X-Axis";
    this.ylabel = "Y-Axis";
    this.showLabels = true;
    this.showTitle = true;
    this.showBorder = true;
    this.borderWidth = 2;
    this.showLegend = false;

    this.x_offset = 0;
    this.y_offset = 0;

    //functional variables
    this.plots = [];

    /* bl = bottom left. coordinates of where the actual graph begins.
     * tr = top right.
     * this is used for determining correct positioning of graph coordinates.
     * */
    this.bl_pix = new Point(this.x_offset + this.width * 0.15,
        this.y_offset + this.height * 0.95);
    this.tr_pix = new Point(this.x_offset + this.width * 0.95,
        this.y_offset + this.height * 0.15);
    this.bl_val = new Point(this.x_min, this.y_min);
    this.bl_val.invert();

    //xpix and ypix are the number of pixels between each labeled coord.
    this.xpix = dist(this.bl_pix.x, this.bl_pix.y,
        this.tr_pix.x, this.bl_pix.y) / this.resolution; //xScale in pixels
    this.ypix = dist(this.bl_pix.x, this.bl_pix.y,
        this.bl_pix.x, this.tr_pix.y) / this.resolution; //yScale in pixels

    //xunit and yunit are the number of pixels one unit on the graph is.
    this.xunit = dist(this.bl_pix.x, this.bl_pix.y,
        this.tr_pix.x, this.bl_pix.y) / (this.x_max - this.x_min); //xUnitScale
    this.yunit = dist(this.bl_pix.x, this.bl_pix.y,
        this.bl_pix.x, this.tr_pix.y) / (this.y_max - this.y_min); //yUnitScale

    this.origin = Point.getPoint(this.bl_pix);
    this.origin.add(this.bl_val.x * this.xunit, this.bl_val.y * this.yunit);
    //console.log(this.origin.x, this.origin.y);

}
//redraw background and plots
Graph.prototype.update = function() {

};
//draw the axis, labels, etc... (the graph without the curves)
Graph.prototype.set_offset = function(xoff, yoff) {
    this.x_offset = xoff;
    this.y_offset = yoff;

    this.bl_pix = new Point(this.x_offset + this.width * 0.15,
        this.y_offset + this.height * 0.85);
    this.tr_pix = new Point(this.x_offset + this.width * 0.90,
        this.y_offset + this.height * 0.15);
    this.bl_val = new Point(this.x_min, this.y_min);
    this.bl_val.invert();


    this.xpix = dist(this.bl_pix.x, this.bl_pix.y,
        this.tr_pix.x, this.bl_pix.y) / this.resolution; //xScale in pixels
    this.ypix = dist(this.bl_pix.x, this.bl_pix.y,
        this.bl_pix.x, this.tr_pix.y) / this.resolution; //yScale in pixels

    this.xunit = dist(this.bl_pix.x, this.bl_pix.y,
        this.tr_pix.x, this.bl_pix.y) / (this.x_max - this.x_min); //xUnitScale
    this.yunit = dist(this.bl_pix.x, this.bl_pix.y,
        this.bl_pix.x, this.tr_pix.y) / (this.y_max - this.y_min); //yUnitScale

    this.origin = Point.getPoint(this.bl_pix);
    this.origin.add(this.bl_val.x * this.xunit, this.bl_val.y * this.yunit);
    console.log(this.origin.x, this.origin.y);
}
Graph.prototype.drawBg = function(bg, border) {
    if (bg === undefined) {
        bg = color(255);
    }
    if (border === undefined) {
        border = color(0);
    }
    //border
    if (this.showBorder == false) {
        noStroke();
    } else {
        stroke(border);
        strokeWeight(this.borderWidth);
    }

    //set background color of graph
    fill(bg);

    //draw base layer of graph
    rect(this.x_offset,
        this.y_offset,
        this.width,
        this.height);

    strokeWeight(1);

    //draw axis
    stroke(0);
    line(this.bl_pix.x, this.bl_pix.y,
        this.tr_pix.x, this.bl_pix.y) //x border
    line(this.bl_pix.x, this.bl_pix.y,
        this.bl_pix.x, this.tr_pix.y) //y border

    //compute resolution values (numeric values)
    var xdiff = (this.x_max - this.x_min) / this.resolution;
    var ydiff = (this.y_max - this.y_min) / this.resolution;

    //draw x values and vertical lines
    fill(0);
    stroke(180);
    var count = this.x_min; //for counting intermediary values
    var pixCount = 0;
    //draw min label
    text(this.x_min, this.bl_pix.x, this.bl_pix.y + 20);
    for (var i = 0; i < this.resolution; i++) {
        count += xdiff;
        pixCount += this.xpix;
        line(this.bl_pix.x + pixCount, this.bl_pix.y + 5,
            this.bl_pix.x + pixCount, this.tr_pix.y);
        text((Math.round(10 * count) / 10).toString(), this.bl_pix.x + pixCount, this.bl_pix.y + 20);
    }

    //draw y values and horizontal lines
    var count = this.y_min; //for counting intermediary values
    var pixCount = 0;
    //draw min label
    text(this.y_min, this.bl_pix.x - 20, this.bl_pix.y);
    for (var i = 0; i < this.resolution; i++) {
        count += ydiff;
        pixCount += this.ypix;
        line(this.bl_pix.x - 5, this.bl_pix.y - pixCount,
            this.tr_pix.x, this.bl_pix.y - pixCount);
        text((Math.round(10 * count) / 10).toString(), this.bl_pix.x - 20, this.bl_pix.y - pixCount);
    }

    //draw title AND axis labels AND legend
    if (this.showTitle == true) {
        textSize(16);
        textAlign(CENTER, CENTER);
        if (this.showLegend != true) {
            text(this.title, this.x_offset + this.width / 2,
                this.y_offset + this.height * .07);
        } else {
            //shift the title out of the way of the legend
            //eg--split the space above the graph between them.
            textSize(16);
            textAlign(CENTER, CENTER);
            text(this.title, this.x_offset + this.width / 4,
                this.y_offset + this.height * .07);

            //draw frame
            fill(bg);
            stroke(border);

            var top = this.y_offset + this.height * 0.02;
            var left = this.x_offset + this.width / 2;
            rect(left, top, this.width / 2.2, this.height * .1);
            //code for drawing legend.
            textSize(12);
            textAlign(LEFT, TOP);
            noStroke();
            fill(0);
            for (var i = 0; i < this.plots.length; i++) {
                text(this.plots[i].plotTitle, left + 8, top + 2);
                top += 12; //shift the count down a line.
            }
        }
    }

    if (this.showLabels == true) {
        //xlabel
        textAlign(CENTER, CENTER);
        textSize(12);
        text(this.xlabel, this.x_offset + this.width / 2, this.y_offset + this.height * .97);
        //ylabel
        push();
        translate(this.x_offset + this.width * .03 - 10, this.y_offset + this.height / 2)
        rotate(-Math.PI / 2);
        text(this.ylabel, 0, 0)
        pop();
    }

};
//plots all plots on this graph
Graph.prototype.plotAll = function() {
    for (var i = 0; i < this.plots.length; i++) {
        if (this.plots[i].timeplot == true) {
            var temp = new Plot();
            temp.data = [];
            temp.data[0] = this.plots[i].data[this.plots[i].data.length - 1];
            temp.fixChoord(this.xunit,
                this.yunit,
                this.origin);
            this.plots[i].data[this.plots[i].data.length - 1] = temp.data[0];
        }
        this.plots[i].plot(this);
    }
};
//add a new plot to the graph.
Graph.prototype.addPlot = function(aplot) {
    //var temp = this.getZeroes();
    aplot.fixChoord(this.xunit,
        this.yunit,
        this.origin);
    this.plots.push(aplot);
};
//get the x and y zero.
Graph.prototype.getZeroes = function() {

};
//get pixel x and y values for a point in the graph.
Graph.prototype.getChoord = function(x, y) {

};

//this might make more sense to put as part of the Plot object
Graph.makeData = function(xarray, yarray) {
    var finalArray = [];
    if (xarray.length == yarray.length) {
        for (var i = 0; i < xarray.length; i++) {
            var p = new Point(xarray[i], yarray[i]);
            finalArray.push(p);
        }
    } else {
        console.log("xarray and yarray lengths differ.");
    }
    return finalArray;
};

//this might make more sense to put as part of the Plot object
Graph.makeUserPlot = function(x1, x2, resolution, lineColor, weight, psize) {
    var finalArray = [];
    var templot = new Plot();
    if (lineColor === undefined) {
        lineColor = color(0);
    }
    if (weight === undefined) {
        weight = 1;
    }
    if (psize === undefined) {
        psize = 3;
    }

    templot.lineColor = lineColor;
    templot.data = [];
    templot.weight = weight;
    templot.pointSize = psize;

    var scale = (x2 - x1) / resolution;
    for (var i = x1; i < x2; i += scale) {
        var p = new Point(i, 0);
        templot.data.push(p);
    }

    return templot;
};

/**

* @constructor Particle

* @description  Creates a Particle for use in a Particle system. 
* @param {p5.Vector} origin A vector object describing the origin location.
* @param {object} options Customize the default properties. (Optional.)
*/

/**
 * @constructor ParticleSystem
 * @description  Creates and manages a collection of Particles. 
 * @param {p5.Vector} origin A vector object describing the origin location.
 * @param {object} options An optional argument containing an object for customized settings. 
 * @example
 * // A small misting effect
 * function setup() {
 *   canvas = createCanvas(600, 500);
 *   mist = new ParticleSystem(createVector(-20, 20))
 * }
 * 
 * function draw() {
 *   clear();
 *   translate(width, height/3)
 *   mist.addParticle();
 *   mist.display()
 * }
 * 
 */


// A simple Particle class
var Particle = function(origin, options) {
    var options = options || {};
    this.position = origin.copy();
    this.acceleration = (typeof options.acceleration !== 'undefined') ?
        createVector(options.acceleration.x, options.acceleration.y) :
        createVector(0, 0.05);
    this.velocity = (typeof options.velocity !== 'undefined') ?
        createVector(
            random(options.velocity.x1, options.velocity.x2),
            random(options.velocity.y1, options.velocity.y2)
        ) :
        createVector(random(0, -3), random(0, -4));

    this.lifespan = (typeof options.lifespan !== 'undefined') ? options.lifespan : 170;
    this.particleSize = (typeof options.particleSize !== 'undefined') ?
        options.particleSize : {
            x: 5,
            y: 5
        };
    // later choose from presets for splashing, hidden...maybe some more later...(smoke?)
    this.strokeColor = (typeof options.strokeColor !== 'undefined') ?
        options.strokeColor : {
            r: 5,
            g: 5,
            b: 250,
            a: 1
        };
    this.strokeWeight = (typeof options.strokeWeight !== 'undefined') ? options.strokeWeight : 1;
    this.fillColor = (typeof options.fillColor !== 'undefined') ?
        options.fillColor : {
            r: 5,
            g: 5,
            b: 250,
            a: 1
        };
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

Particle.prototype.display = function() {
    stroke(
        this.strokeColor.r,
        this.strokeColor.g,
        this.strokeColor.b,
        this.strokeColor.a * this.lifespan
    );
    strokeWeight(this.strokeWeight);
    fill(this.fillColor, this.lifespan, 0.1);
    fill(
        this.fillColor.r,
        this.fillColor.g,
        this.fillColor.b,
        this.fillColor.a * this.lifespan
    );
    ellipse(
        this.position.x,
        this.position.y,
        this.particleSize.x,
        this.particleSize.y
    );
};

// Is the particle still useful?
Particle.prototype.isDead = function() {
    if (this.lifespan < 0) {
        return true;
    }
    return false;
};

var ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.display = function() {
    for (var i = this.particles.length - 1; i >= 0; i--) {
        var p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};

/**
* Creates a Wave Object. 
* @constructor Wave
* @param {object} options Customize the default properties. (Optional.)
* @property {object} bounds Set the bounding box for the Wave. (default: {x: width, y: height})
* @property {number} theta Angle of the Wave. 
* @property {number} amplitude Amplitude of the Wave. 
* @property {number} wavelength Wavelength of the wave. (default: 200px)
* @property {number} angularVelocity Angular velocity of the wave. 
* @property {object} styles Object containing display settings.
* @property {object} styles.line Object containing display settings for a line drawn along the Wave. 
* @property {object} styles.line.visible Sets whether the line is visible. 
* @property {object} styles.dots Object containing display settings for a series of dots drawn along the Wave. 
* @property {object} styles.dots.visible Sets whether the dots are visible. 
* @property {number} xSpacing Determines the scaling of the wave along the x-axis. 
* @property {Array} yValues Array containing y-values of points along the wave. 
* @property {method} Wave.update() Updates the Wave Object.
* @property {method} Wave.display() Displays the Wave Object.
 


* @example
* // a basic wave
* var myWave;
* function setup() {
*  frameRate(30);
*  createCanvas(700, 400);
*  myWave = new Wave();
* }
*
* function draw() {
*  clear();
*  myWave.update();
*  myWave.display();
* }

* @example
* // draws a sine wave and a cosine wave 
* var mySine;
* var myCosine;
* 
* function setup() {
*  frameRate(30);
*  createCanvas(700, 400);
*  mySine = new Wave({ type: "sine" });
*  myCosine = new Wave({ type: "cosine" });
*  myCosine.styles.line.color = "blue";
*  myCosine.calculate();
*  mySine.calculate();
* }
* 
* function draw() {
*  clear();
*  mySine.update();
*  myCosine.update();
*  mySine.display();
*  myCosine.display();
* }
* 
**/


function Wave(options) {
    this.options = options || {};
    this.type = this.options.type || "sine";
    this.bounds = {
        x: width,
        y: height
    }; // portion of canvas to use as dimensions
    this.theta = 180; // initial angle (omega * t = theta)
    this.amplitude = 8;
    this.wavelength = 200; // How many pixels before the wave repeats
    this.angularvelocity = 2;
    this.xspacing = 8; // scales how far between each point
    this.yspacing = 10;
    this.yvalues = new Array(floor(this.bounds.x / this.xspacing)); // stores y values to generate the wave
    this.timestep = 0.01;
    this.styles = {
        line: {
            visible: true,
            color: "red" || "blue",
            strokeWeight: 5
        },
        dots: {
            visible: false,
            size: 5,
            color: "black",
            highLightSpecial: true,
            highLightColor: "red"
        }
    };
    this.styles.line.visible = true;
    this.styles.line.color = this.styles.line.color || "blue";
}
Wave.prototype.calculate = function() {
    this.dx = TWO_PI / this.wavelength * this.xspacing;
    var x = this.theta;
    if (this.type == "sine") {
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.sin(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    } else if (this.type == "cosine") {
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.cos(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    } else if (this.type == "tangent") {
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.tan(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    }
};
Wave.prototype.update = function() {
    // console.log(this.timestep)
    this.dx = TWO_PI / this.wavelength * this.xspacing;
    this.theta -= this.timestep * this.angularvelocity;
    var x = this.theta;
    if (this.type == "sine") {
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.sin(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    } else if (this.type == "cosine") {
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.cos(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    } else if (this.type == "tangent") {
        // needs work
        for (var i = 0; i < this.yvalues.length; i++) {
            this.yvalues[i] = Math.tan(x) * this.amplitude * this.yspacing;
            x += this.dx;
        }
    }
};
Wave.prototype.display = function() {
    // draw line plot
    if (this.styles.line.visible) {
        push();
        noFill();
        strokeWeight(this.styles.line.strokeWeight);
        stroke(this.styles.line.color);
        beginShape();
        for (var x = 0; x < this.yvalues.length; x += 2) {
            curveVertex(x * this.xspacing, height / 2 + this.yvalues[x]);
        }
        endShape();
        pop();
    }
    if (this.styles.dots.visible) {
        noStroke();
        // draw balls
        for (var x = 2; x < this.yvalues.length - 2; x += 2) {
            if (x == 20) {
                if (this.styles.dots.highLightSpecial) {
                    fill(this.styles.dots.highLightColor);
                }
            } else {
                fill(this.styles.dots.color);
            }
            ellipse(
                x * this.xspacing,
                height / 2 + this.yvalues[x],
                this.styles.dots.size,
                this.styles.dots.size
            );
        }
    }
};

/**
* Creates a static background.
* @constructor StaticBackground
* @param {object} options Customize the default properties for scenery. (Optional.)
* @property {string} type Current options: 'basic' or 'grassy' 
 * @property {color} scenery.ground Color of the foreground.
 * @property {color} scenery.sky Color of the sky.
 * @property {number} scenery.vanishingPoint Determines the location of the horizon as a portion of the total height. (.1 = 10% sky, .9 = 90% sky)
* @property {method}  StaticBackground.display() Draws the StaticBackground object.

* @example
* // draws the default static background
* function setup() {
*  canvas = createCanvas(500, 500);
*  bg = new StaticBackground();
*  bg.display();
* }
* @example
* // draws a grassy background with some custom settings
* function setup() {
*   canvas = createCanvas(500, 500);
*   bg = new StaticBackground({ type: "grassy", vanishingPoint: 0.2 });
*   bg.display();
* }
* @example
* // change the sky color after creating the background
* function setup() {
*   canvas = createCanvas(500, 500);
*   bg = new StaticBackground();
*   bg.display();
* }
* function draw(){
*   bg.scenery.sky = "orange";
*   bg.display();
* }

*/



var StaticBackground = function(options) {
    this.options = options || {};
    this.type = typeof this.options.type !== undefined ?
        this.options.type :
        "basic";
    if (this.type == "basic") {
        this.scenery = new BasicBackground(this.options);
        this.display = function() {
            this.scenery.display();
        };
    } else if (this.type == "grassy") {
        this.scenery = new GrassyBackground(this.options);
        this.display = function() {
            this.scenery.display();
        };
    }
};

var BasicBackground = function(options) {
    this.options = options || {};
    this.ground = this.options.ground === undefined ?
        "grey" :
        this.options.ground;
    this.sky = "#F9F6FE";
    this.rotate = 0;
    // .2 = lots of ground, .9 = very little ground
    this.vanishingPoint = typeof this.options.vanishingPoint !== undefined ?
        this.options.vanishingPoint :
        0.6;
    this.horizon = {
        x1: 0,
        y1: height * this.vanishingPoint,
        x2: width,
        y2: height
    };
    this.horizonHighlight = false;
    this.horizonHighlightColor = "black";
    this.horizonHighlightWeight = 3;
};

BasicBackground.prototype.display = function() {
    background(this.sky);
    push();
    noStroke();
    fill(this.ground);
    rect(this.horizon.x1, this.horizon.y1, this.horizon.x2, this.horizon.y2);
    pop();
    if (this.horizonHighlight) {
        line(this.horizon.x1, this.horizon.y1, this.horizon.x2, this.horizon.y1);
        stroke(this.horizonHighlightColor);
        strokeWeight(this.horizonHighlightWeight);
    }
};
GrassyBackground.prototype = Object.create(BasicBackground.prototype);

function GrassyBackground(options) {
    this.options = options || {};
    this.options.ground = this.options.ground || "green";
    BasicBackground.call(this, this.options);
}
