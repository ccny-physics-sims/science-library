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
