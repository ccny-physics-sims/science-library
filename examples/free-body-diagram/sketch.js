
var forceSlider;


function setup() {
  canvas=createCanvas(400 , 400);
  canvas.parent('sketch-holder');

  forceSlider = createSlider(0, 200, 25);
  forceSlider.position(20,30);
  forceSlider.parent('sketch-holder');

  angleSlider = createSlider(0, 2*PI, 0,0.0174533);
  angleSlider.position(20,80);
  angleSlider.parent('sketch-holder');

  box_fbd = new FBD(createVector(width/2,height/2),3,true);

  box_fbd.showLabels = true;



}

function draw() {
  background(250);

  push();
  noStroke();
  fill('black');
  text('Force 3 Mag: ' + forceSlider.value(),20,10,100,20);
  text('Force 3 Angle: ' + round(angleSlider.value()*(180/PI)) +  ' deg',20,60,150,90);
  pop();

  box_fbd.mag = [100,100,forceSlider.value()];
  box_fbd.direction = [.1,3*PI/2,angleSlider.value()]
  box_fbd.xoffsets = [0,0,0]
  box_fbd.yoffsets = [0,0,0]
  box_fbd.labels = ['force 1','force 2','force 3']

  box_fbd.update();
  box_fbd.display();


}
