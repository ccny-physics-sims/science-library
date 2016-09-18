
function setup() {
  createCanvas(800, 500);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-5,5),random(-5,5));
  accel = createVector(0,0);
  //make the ball! It is an instance of the mover object
  ball = new KineticMass(pos,vel,accel,10,'red');

}


function draw() {

  background(250);
  //update the position
  ball.update();
  //make the ball bounce
  ball.bounceEdges();
  //display changes
  ball.display();

  }
