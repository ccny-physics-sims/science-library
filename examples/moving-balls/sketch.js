var ball = [];
howMany = 250;

function setup() {
  createCanvas(800, 500);
  frameRate(30);

for (var i = 0; i < howMany; i++){
  pos = createVector(random(0,width),random(0,height))
  vel = createVector(random(-1,1),random(-1,1));
  accel = createVector(0,0);
  colors = color(map(vel.mag(),0,1,0,255),0,map(vel.mag(),0,1,255,0))
  ball[i] = new KineticMass(pos,vel,accel,10,colors);
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
