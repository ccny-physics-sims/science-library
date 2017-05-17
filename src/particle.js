/**

* @constructor Particle

 * @description  Creates a Particle for use in a Particle system. 
* @param {p5.Vector} origin A vector object describing the origin location.
* @param {object} options An optional argument containing an object for customized settings. 
*/

/**

* @constructor ParticleSystem

 * @description  Creates and manages a collection of Particles. 
* @param {p5.Vector} origin A vector object describing the origin location.
* @param {object} options An optional argument containing an object for customized settings. 
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
