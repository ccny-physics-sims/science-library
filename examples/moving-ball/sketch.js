var ball = [];
howMany = 10;

function setup() {
  createCanvas(800, 500);
  frameRate(30);

for (var i = 0; i < howMany; i++){
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-1,1),random(-1,1));
  accel = createVector(random(-1,1),random(-1,1));
ball[i] = new Mover(pos,vel,accel,10,'red');
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
