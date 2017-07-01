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
