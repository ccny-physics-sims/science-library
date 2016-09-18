
function setup() {
  createCanvas(800, 500);
  background(250);
  frameRate(30);

  //choose random vectors for the balls initial motion
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-5,5),random(-5,5));
  accel = 0;

  //make the ball! It is an instance of the mover object
  ball = new KineticMass(pos,vel,accel,20,'gray');

  //This will be the position vector
  posVector = new Arrow(createVector(width/2,height/2),pos);
  posVector.color = color('blue');
  posVector.width = 10;
  posVector.showComponents = true;

  //And this will be the velocity vector
  velVector = new Arrow(pos,vel);
  velVector.color = color('green');
  velVector.width = 10;
  velVector.showComponents = true;

}


function draw() {

  background(250);
  //draw some axis
  drawAxes();
  //update the position
  ball.update();
  //make the ball bounce
  ball.bounceEdges();
  //display changes
  ball.display();

  //update the position vector by setting its target to be equal to the balls position
  posVector.target = ball.position;
  posVector.update();
  posVector.display();


  //the velocity vector will start where the ball is (i.e ball.position) and point in the direction of the velocity
  velVector.origin = ball.position;
  velVector.target = p5.Vector.add(p5.Vector.mult(ball.velocity,15),ball.position);
  velVector.update();
  velVector.display();

  }
