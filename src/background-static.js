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
