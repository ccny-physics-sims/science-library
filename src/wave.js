/**
* Creates a Wave Object. 
* @constructor Wave
* @param {object} options Customize the default Wave. 
* @property {object} bounds Set the bounding box for the Wave. (default: {x: width, y: height})
* @property {number} theta Angle of the Wave. 
* @property {number} amplitude Amplitude of the Wave. 
* @property {number} wavelength Wavelength of the wave. (default: 200px)
* @property {number} angularVelocity Angular velocity of the wave. 
* @property {object} displaySettings Object containing display settings.
* @property {object} displaySettings.line Object containing display settings for a line drawn along the Wave. 
* @property {object} displaySettings.line.visible Sets whether the line is visible. 
* @property {object} displaySettings.dots Object containing display settings for a series of dots drawn along the Wave. 
* @property {object} displaySettings.dots.visible Sets whether the dots are visible. 
* @property {number} xSpacing Determines the scaling of the wave along the x-axis. 
* @property {Array} yValues Array containing y-values of points along the wave. 
* @property {method} Wave.updates() Updates the Wave Object.
* @property {method} Wave.display() Displays the Wave Object.
 


* @example
*function setup() {
*  frameRate(30);
*  createCanvas(700, 400);
*  muhWave = new Wave();
*}
*
*function draw() {
*  clear();
*  muhWave.update();
*  muhWave.display();
*}
**/


    //TODO: iterate over items in this.displaySettings[item]
function Wave(options) {
  var options = options || {};
  this.bounds = { x: width, y: height }; // portion of canvas to use as dimensions
  this.theta = 0; // initial angle (omega * t = theta)
  this.amplitude = 8;
  this.wavelength = 200; // How many pixels before the wave repeats
  this.angularvelocity = 2;
  this.displaySettings = {line: {visible: true, color: 'black', strokeWeight: 5}, dots: {visible: false, color: 'red', highLightSpecial: true, highLightColor: 'green'}};
  this.xspacing = 8; // scales how far between each point
  this.yvalues = new Array(floor(this.bounds.x / this.xspacing)); // stores y values to generate the wave
  this.onWindowResize = function() {};
  this.update = function() {
    this.dx = TWO_PI / this.wavelength * this.xspacing;
    this.theta -= 0.01 * this.angularvelocity;
    var x = this.theta;
    for (var i = 0; i < this.yvalues.length; i++) {
      this.yvalues[i] = Math.sin(x) * this.amplitude * 10;
      x += this.dx;
    }
  };
  this.display = function() {

    if (this.displaySettings.dots.visible){
    noStroke();
    // dtaw balls
    for (var x = 2; x < this.yvalues.length - 2; x += 2) {
      if (x == 20) {
        fill(230, 40, 40);
      } else {
        fill(0);
      }
      ellipse(x * this.xspacing, height / 2 + this.yvalues[x], 5, 5);
    }
    }
    // draw line plot 
    if (this.displaySettings.line.visible){
    push();
    noFill();
    strokeWeight(this.displaySettings.line.strokeWeight)
    stroke(this.displaySettings.line.color);
    beginShape();
    for (var x = 0; x < this.yvalues.length; x += 2) {
      curveVertex(x * this.xspacing, height / 2 + this.yvalues[x]);
    }
    endShape();
    pop();
  };
  }
}
