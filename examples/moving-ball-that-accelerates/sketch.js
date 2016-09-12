
function setup() {
  createCanvas(800, 500);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-5,5),random(-5,5));
  accel = createVector(0,0);
  //make the ball! It is an instance of the mover object
  ball = new Mover(p5.Vector.add(pos, createVector(20,0)),vel,accel,10,'red');
  gravityBall1 = createVector(0,.3*ball.mass)
  ball.tail = true;
  ball.accelerationMultiplier = 1;

  ball2 = new Mover(pos,vel,accel,20,'green');
  gravityBall2 = createVector(0,.3*ball2.mass)
  ball2.tail = true;

}


function draw() {

  background(250);
  //update the position
  ball.giveItAnAcceleration(createVector(0,.3));
  ball.update();
  //make the ball bounce
  ball.bounceEdges();
  //display changes
  ball.display();
  ball2.applyForce(gravityBall2);
  ball2.update();
  //make the ball bounce
  ball2.bounceEdges();
  //display changes
  ball2.display();
  }
