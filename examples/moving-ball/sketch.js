var ball = [];
howMany = 10;

function setup() {
  createCanvas(800, 500);
  frameRate(30);
pos = createVector(width/2,height/2)
vel = createVector(1,1);
accel = createVector(1,1);
for (var i = 0; i < howMany; i++){
ball[i] = new Mover(createVector(random(-20,20),random(-20,20)),vel,accel,10,'red');
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
