
function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');



  velocity = createVector(-10,0);
  acceleration = createVector(0,0);
  basePosition = createVector(width/2,height/2);

  bg = new movingBackground('clouds',basePosition,velocity,acceleration);

  center = createVector(width/2,height/2)
  velVec = new Arrow(center,p5.Vector.add(center,bg.velocity))
  velVec.color="green";
  velVec.grab = false;
  velVec.draggable = false;
  velVec.showComponents = false;

  accelVec = new Arrow(center,p5.Vector.add(center,bg.acceleration))
  accelVec.color="purple";
  accelVec.grab = false;
  accelVec.draggable = false;
  accelVec.showComponents = false;


}

function draw() {
  background('white');

  bg.acceleration = createVector(sin(frameCount/100)/10,-cos(frameCount/200)/10);

   bg.update();
   bg.display();


  rectMode(CORNER);
  push();
  velVec.target = p5.Vector.add(center,p5.Vector.mult(bg.velocity,-4));
  velVec.update();
  velVec.display();
  pop();
  accelVec.target = p5.Vector.add(center,p5.Vector.mult(bg.acceleration,-600));
  accelVec.update();
  accelVec.display();
  fill('orange');
  ellipse(center.x,center.y,20,20);

}
