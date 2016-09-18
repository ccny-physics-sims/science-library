
function setup() {
  createCanvas(800, 500);
  background(250);
  //choose random vectors for the balls initial motion
  pos = createVector(height/4,width/4);
  vel = createVector(2,0);
  accel = createVector(0,0);
  //make the ball! It is an instance of the Mass object
  ball = new KineticMass(p5.Vector.add(pos, createVector(10,0)),vel,accel,10,'red');
  gravity = createVector(1,2)


}


function draw() {

  //background(250);
  //update the position
  ball.applyForce(gravity);
  ball.update();
  //make the ball bounce
  ball.bounceEdges();
  //display changes
  ball.display();

  }
