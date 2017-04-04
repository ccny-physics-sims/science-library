
function setup() {

  canvas = createCanvas(500, 500);
  canvas.parent('sketch-holder');

  //frameRate(25);


  //create slider for adjusting the accleration
  accelSlider = createSlider(-100, 100, 0);
  accelSlider.parent('sketch-holder');
  accelSlider.position(20, 60);
  accelSlider.style('width', '150px');


  velocity = createVector(0,0);
  acceleration = createVector(0,0);
  basePosition = createVector(0,200);

  bg = new movingBackground('cityStreet',basePosition,velocity,acceleration);

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

  bg.acceleration = createVector(-accelSlider.value()/1000,0);

   bg.update();
   bg.display();

   push();
   noStroke();
   fill('black');
   text('Acceleration: ' + accelSlider.value(),20,20,100,20);
   text('Velocity: ' + round(-bg.velocity.x*10)/10,20,40,150,20);
   pop();

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
