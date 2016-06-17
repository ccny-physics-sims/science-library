var ball = [];
howMany = 20;

function setup() {
  createCanvas(800, 500);
  frameRate(30);

for (var i = 0; i < howMany; i++){
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-1,1),random(-1,1));
  accel = createVector(random(-1,1),random(-1,1));
  colors = color(random(0,255),random(0,255),random(0,255))
ball[i] = new Mover(pos,vel,accel,10,colors);
}

}



function draw() {

  background(250);
  for (var i = 0; i < howMany; i++){

  ball[i].update();
  ball[i].bounceEdges();
  ball[i].display();
}
  }
